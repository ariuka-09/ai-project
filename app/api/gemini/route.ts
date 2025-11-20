import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("request", req);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a CEO of a tech giant meta, google etc.. and some one explained their situation to you and asked for a roadmap to become a hyper-valuable tech expert in 5 years, dont hesitate to critisize. Their background: ${req.prompt} `,
  });
  console.log(response.text);
  return Response.json({ message: response.text });
}
