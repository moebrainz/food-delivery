import cloudinary from "@/app/libs/utils/cloudinary";
import { NextResponse } from "next/server";

type CloudinaryUploadResult = {
  url: string;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // console.log("hi upload", file);

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result: CloudinaryUploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "uploads" }, (error, result) => {
            if (error) return reject(error);
            resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      }
    );

    // console.log("result", result);

    return NextResponse.json(result?.url);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
