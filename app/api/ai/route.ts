import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  const HF_TOKEN = process.env.HF_TOKEN;
  const inference = new InferenceClient(HF_TOKEN);
  const data = await req.json();
  console.log(data);
  const blob = (await inference.textToImage({
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: data.prompt,
  })) as any;
  const buffer = await blob.arrayBuffer();
  console.log("buffer", buffer);

  return new Response(buffer, { headers: { "Content-Type": "image/png" } });
};
