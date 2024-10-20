import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
  id: Generated<number>;
  user_id: number;
  key: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
