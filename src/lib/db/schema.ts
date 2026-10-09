import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    money: integer("money").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const items = pgTable("items", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    inStock: integer("in_stock").notNull()
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;