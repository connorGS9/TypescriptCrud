
import {Item, Customer, items, customers} from "./schema"
import { db } from "./index";
import { gt, eq, sql, and, gte } from "drizzle-orm"
import { ShoppingCart } from "../../types/cart"
import { UUID } from "crypto";

export async function getItems() : Promise<Item[]> {
    // Call db and get all items
    const itemList: Item[] = await db.select().from(items).where(gt(items.inStock, 0));
    return itemList;
}

export async function buyItems(toBuy: ShoppingCart, buyerId: UUID) : Promise<boolean> {
    try {
        await db.transaction(async (tx) => { // Perform transaction using given tx instead of directly with db
            for (const line of toBuy.itemList) { // For each item try and buy it (subtract stock and money from user)
                const [id, quantity] = line; // ShoppingCart.itemList is a tuple of (String: ID, Number: quantity)
                const [row] = await tx // Get the item price for this item directly from the db
                    .select({ price: items.price })
                    .from(items)
                    .where(eq(items.id, id));
                const cost = row.price * quantity; // Cost for user to purchase the total number of items
                const stockUpdated = await tx // Ensure we have at least quantity number of items before purchasing
                    .update(items)
                    .set({ inStock: sql`${items.inStock} - ${quantity}` })
                    .where(and(eq(items.id, id), gte(items.inStock, quantity)))
                    .returning({ id: items.id });
                
                const paid = await tx // Ensure customer can pay the cost of the item or revert whole purchase
                    .update(customers)
                    .set({ money: sql`${customers.money} - ${cost}` })
                    .where(and(eq(customers.id, buyerId), gte(customers.money, cost)))
                    .returning({ id: customers.id });
            }});
        return true;
    } catch {
        console.log("purchase failed!");
        return false;
    }
}