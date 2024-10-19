import client from "../util/client";

export interface ResponseMessage {
  feedbackId: string;
  answer: string;
}

export interface ResponseStats {
  positive: number;
  negative: number;
  total: number;
}

/** Send message to external AI api
 *
 * @throws `Error` when request failed on any reason
 */
export async function sendMessage(message: string) {
  const response = await client.post("/invoke", {
    question: message,
  });

  if (response.status != 200)
    throw new Error("Unable to make request", response.data);

  return response.data as ResponseMessage;
}

export async function sendStatus(messageId: string, status: boolean) {
  const response = await client.put("/feedback", {
    id: messageId,
    isUseful: status,
  });

  if (response.status != 200)
    throw new Error("Unable to make request", response.data);
}

export async function getStats() {
  const response = await client.get("/feedback");

  if (response.status != 200)
    throw new Error("Unable to make request", response.data);
  return response.data as ResponseStats;
}
