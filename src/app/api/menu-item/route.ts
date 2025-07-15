import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { MenuItem } from "@/app/models/Menu-Item";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  //connect database
  mongoConnect();

  const { image, itemName, itemDescription, itemPrice, itemCategory } =
    await req.json();

  if (!ObjectId.isValid(itemCategory)) {
    throw new Error("Invalid ObjectId");
  }

  const itemCategoryId = new ObjectId(itemCategory);

  console.log(itemCategoryId);

  console.log("Menu Item", {
    itemName,
    itemDescription,
    itemPrice,
    itemCategoryId,
  });

  const responseDoc = await MenuItem.create({
    image,
    itemName,
    itemDescription,
    itemPrice,
    itemCategoryId,
  });

  console.log("Respnse Data", responseDoc);

  return Response.json(responseDoc);
}
export async function PUT(req: NextRequest) {
  //connect database
  mongoConnect();

  const { _id, itemCategory, ...data } = await req.json();

  if (!ObjectId.isValid(itemCategory)) {
    throw new Error("Invalid ObjectId");
  }

  const itemCategoryId = new ObjectId(itemCategory);

  const newData = { ...data, itemCategoryId };

  console.log(newData);

  const responseDoc = await MenuItem.findByIdAndUpdate(_id, newData);

  console.log("Respnse Data", responseDoc);

  return Response.json(true);
}

export async function GET() {
  mongoConnect();

  return Response.json(await MenuItem.find());
}

export async function DELETE(req: NextRequest) {
  mongoConnect();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  const result = await MenuItem.deleteOne({ _id });

  console.log(result);

  return Response.json(true);
}
