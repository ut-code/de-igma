import { PrismaClient } from "@prisma/client";
import express, { response } from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(express.json()); // JSON ボディをパースするためのミドルウェア
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("src/static"));

const client = new PrismaClient();
type Questions = {
  id: bigint;
  EnglishSentences: string;
  created_at: Date;
}[];

async function main() {
  const questions: Questions = await client.questions.findMany();
  return questions;
}

//平文を増やす関数
async function addHirabun(sentence: string) {
  const newQuestion = await client.questions.create({
    data: { EnglishSentences: sentence },
  });
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

app.post("/addHirabun", (request, response) => {
  const hirabun = request.body.hirabun;
  addHirabun(hirabun);
});
// addHirabun("I have a pen.")

//cookie関連

app.post("/sendUserName", (req, res) => {
  const { username, password } = req.body;

  // ユーザー名とパスワードのバリデーション（簡易的な例）
  if (username === "validuser" && password === "password123") {
    // ログイン成功時、Cookie にデータを保存
    res.cookie("username", username, { httpOnly: true });

    res.json({ success: true, message: "ログイン成功" });
  } else {
    res.json({ success: false, message: "ログイン失敗" });
  }
});

app.listen(3000);
