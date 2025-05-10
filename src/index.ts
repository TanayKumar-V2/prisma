import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      userName: "Tanay",
      password: "1234",
      age: 20,
    },
  });
}

createUser()