import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { Category } from "@/app/models/Category";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  //connect to mongodb
  mongoConnect();

  //get data from request body
  const { name } = await req.json();

  //create a new category
  const categoryDoc = await Category.create({ name });

  //return response
  return Response.json(categoryDoc);
}
export async function PUT(req: NextRequest) {
  //connect to mongodb
  mongoConnect();

  //get data from request body
  const { _id, name } = await req.json();

  console.log("data", _id, name);

  //create a new category
  await Category.updateOne({ _id }, { name });

  //return response
  return Response.json(true);
}

export async function GET() {
  mongoConnect();

  return Response.json(await Category.find());
}

export async function DELETE(req: NextRequest) {
  mongoConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  console.log("id confirmed", _id);

  const result = await Category.deleteOne({ _id });

  console.log(result);

  return Response.json(true);
}
