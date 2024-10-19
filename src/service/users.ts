import db from "../db/kysely";
import { User } from "../db/schema/user-table";

export async function getById(id: number): Promise<User | undefined> {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", id)
    .executeTakeFirst();
}

export async function addKey(id: number, key: string) {
  await db.insertInto("users").values({ user_id: id, key }).executeTakeFirst();
}
