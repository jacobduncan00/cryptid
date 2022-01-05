const pgp = require("pg-promise")({
  noWarnings: true,
});

const db = pgp(process.env.PSQL_KEY);

export default async (req: any, res: any) => {
  try {
    const { roomID } = req.query;

    if (!roomID) {
      return res.status(422).send({ error: ["Missing room ID"] });
    }

    const room = await db.one(
      "INSERT INTO rooms(roomID, open) VALUES($1, $2) RETURNING *",
      [roomID, true]
    );

    res.status(200).json(room);
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .send({ message: ["Error creating on the server"], error: error });
  }
};
