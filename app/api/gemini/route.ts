import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("request", req);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `you are a HR at meta, facebook and say you are looking an job application and then you come accross an application would you hire that person? scale with percentages, explain why or why not elaborately 
    the application: ${req.prompt} `,
  });
  console.log(response.text);
  return Response.json({ message: response.text });
}
