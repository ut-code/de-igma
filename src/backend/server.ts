import { PrismaClient } from "@prisma/client";
import express, { response } from "express";
const app = express();

app.use(express.static("src/static"));

const client = new PrismaClient();
type Questions = { 
  id:               bigint; 
  EnglishSentences: string;
  created_at:       Date; 
}[];

async function main() {
  const questions: Questions = await client.questions.findMany();
  return questions;
}

//平文を増やす関数
async function addHirabun(sentence: string) {
  const newQuestion = await client.questions.create({ data: { EnglishSentences: sentence } });
} 

app.get("/data", async (request, response) => {
  try {
    const data = await main();
    const serializedData = JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );
    response.json(JSON.parse(serializedData)); // JSON形式でデータを返す
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An error occurred." });
  }
});

addHirabun("I have a pen.")
app.listen(3000);
