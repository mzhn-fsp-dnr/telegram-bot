import client from "../util/client";

export interface Category {
  id: string;
  name: string;
  parent_id: string;
  children: Category[];
}

export async function all(org_id: string) {
  return (await client.get(`/offices/offices/${org_id}`)).data
    .services as Category[];
}
