import redis from "../../lib/redis";
export default async (req: any, res: any) => {
  const rooms = await redis.hvals("rooms");
  console.log(rooms);
  res.status(200).send("ok");
};
