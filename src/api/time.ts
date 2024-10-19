import client from "../util/client";

export async function all(date: string): Promise<string[]> {
  return (await client.get(`https://api.mzhn.fun/prereg/slots/${date}`)).data;
}
