import client from "../util/client";

export async function create(
  department_id: string,
  service_id: string,
  assigned_to: string
): Promise<void> {
  return (
    await client.post("/prereg/", { department_id, service_id, assigned_to })
  ).data.code;
}
