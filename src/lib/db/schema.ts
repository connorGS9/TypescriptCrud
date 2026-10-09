import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const customer = pgTable("customers", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    money: integer("money").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const item = pgTable("items", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    inStock: integer("in_stock").notNull()
});

export type customer = typeof customer.$inferSelect;
export type newCustomer = typeof customer.$inferInsert;
export type item = typeof item.$inferSelect;
export type newItem = typeof item.$inferInsert;