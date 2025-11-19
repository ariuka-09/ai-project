import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    if (!image)
      return NextResponse.json(
        { error: "No image was provided" },
        { status: 400 }
      );
    const result = (await inference.objectDetection({
      model: "facebook/detr-resnet-50",
      data: image,
    })) as any;

    console.log("result", result);

    const objects = result
      //   .filter((obj: any) => obj.score > 0.5)
      .map((obj: any) => ({
        label: obj.label,
        score: obj.score,
        box: obj.box,
      }));
    return NextResponse.json({ objects });
  } catch (error) {
    console.error("Error in object detection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
