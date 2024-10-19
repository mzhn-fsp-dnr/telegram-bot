import client from "../util/client";

export interface Organization {
  id: string;
  name: string;
  address: string;
}

export async function all(): Promise<Organization[]> {
  return (await client.get("/offices/offices/")).data.items;
}
