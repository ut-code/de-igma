-- CreateTable
CREATE TABLE "questions" (
    "id" BIGSERIAL NOT NULL,
    "EnglishSentences" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);
