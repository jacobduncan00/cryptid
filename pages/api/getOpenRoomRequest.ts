import redis from "../../lib/redis";
export default async (req: any, res: any) => {
  // redis.flushall();
  const rooms = await redis.hvals("rooms");
  let resArr: any[] = [];
  for (let i = 1; i < rooms.length + 1; i++) {
    await redis.hget("rooms", i.toString()).then((r) => {
      resArr.push(r);
    });
  }
  res.status(200).send({ rooms: resArr, roomLen: rooms.length });
};
