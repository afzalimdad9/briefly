import { TEXTRAZOR_API_KEY } from "@/config";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { text } = body;

    const response = await axios.post(
      "https://api.textrazor.com/",
      {
        text, // Specify the text you want to analyze
        extractors: [
          "entities",
          "topics",
          "words",
          "phrases",
          "dependency-trees",
          "relations",
          "entailments",
          "senses",
          "spelling",
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-TextRazor-Key": TEXTRAZOR_API_KEY,
        },
      }
    );

    const summarizedText = response.data.response.sentences
      .map((sentence: any) => sentence.extracted)
      .join(" ");

    return Response.json({ summarizedText }, { status: 200 });
  } catch (error) {
    console.error("Error in summarization API: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
