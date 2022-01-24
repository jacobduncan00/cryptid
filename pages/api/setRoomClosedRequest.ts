import redis from "../../lib/redis";
export default async (req: any, res: any) => {
  console.log(`Closing Room ${req.body}`);
  await redis.hset(
    "rooms",
    req.body,
    JSON.stringify({ roomID: req.body, closed: true })
  );
  console.log(`Closed Room ${req.body}`);
  res.status(200).send(`Closed Room ${req.body}`);
};
