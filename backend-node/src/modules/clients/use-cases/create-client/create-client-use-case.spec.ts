import { Db, MongoClient } from "mongodb";

describe("create client use-case", () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb://mongodb_database:27017",
      {}
    );

    console.log(connection);

    db = connection.db("share_energy");

    console.log(db);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should be able to create a client", () => {
    console.log("yeah");
  });
});
