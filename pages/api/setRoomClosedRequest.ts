import redis from "../../lib/redis";
export default async (req: any, res: any) => {
  await redis.hset(
    "rooms",
    req.body.roomID,
    JSON.stringify({ roomID: req.body.roomID, closed: true })
  );
  // const isOpen = get?.includes("closed") && get?.includes("false");
  // const isClosed = get?.includes("closed") && get?.includes("true");
  res.status(200).send(`Closed Room ${req.body.roomID}`);
};
