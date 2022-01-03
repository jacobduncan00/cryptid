import Ably from "ably/promises";

export default async function handler(req: any, res: any) {
  const client = new Ably.Realtime(process.env.ABLY_REALTIME_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  res.status(200).json(tokenRequestData);
}
