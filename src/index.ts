import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const app = express();

const client = new PrismaClient();

app.post("/users", async(req, res)=>{
    const{userName, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 16);
    const user = await client.user.create({
        data: {
            userName,
            password: hashedPassword,
        },
    });

    const todos=await client.todo.findFirst({
        select:{
            user:true
        }
    })
})

app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({
    users,
  });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const user = await client.user.findFirst({
    where: {
      id: parseInt(id),
    },
    select: {
      todos: true,
    },
  });

  res.json({
    user
  })

});

app.listen(3000)
