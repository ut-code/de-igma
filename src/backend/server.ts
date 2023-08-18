import { PrismaClient } from "@prisma/client";
import express, { response } from "express";
const app = express();

app.use(express.static("src/static"));

const client = new PrismaClient();
type Questions = { id: bigint; created_at: Date; EnglishSentences: string }[];

async function main() {
  const questions: Questions = await client.questions.findMany();
  const data: string = questions.toString();
  return data;
}

app.get("/data", (request, response) => {
  const data = main();
  response.send(data);
});

app.listen(3000);
