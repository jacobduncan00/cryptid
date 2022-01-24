import redis from "../../lib/redis";
export default async (req: any, res: any) => {
  await redis.hdel("rooms", "closed");
  res.status(200).send(`Deleted Room ${req.body.roomID}`);
};
