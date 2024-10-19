import client from "../util/client";

export interface Category {
  id: string;
  name: string;
  parent_id: string;
  children: Category[];
}

export async function all() {
  return (await client.get("/services/services")).data as Category[];
}
