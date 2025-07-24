import { authOptions } from "@/app/libs/authOptions";
import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { User } from "@/app/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

// type UpdateProps = {
//   name: string;
//   image: string;
// };

export async function PUT(req: NextRequest) {
  mongoConnect();

  const data = await req.json();
  //get the current logged in user
  const session = await getServerSession(authOptions);
  const email = session?.user.email;

  //grab user from the database
  // const user = await User.findOne({ email });

  //get the current user with session

  // const update: Partial<UpdateProps> = {};

  // if ("name" in data) {
  //   update.name = data.name;
  // }
  // if ("image" in data) {
  //   update.image = data.image;
  // }

  // console.log("update", update);

  // if (Object.keys(update).length > 0) {
  //   //update user profile

  //   await User.updateOne({ email }, update);
  // }
  // if ("name" in data) {
  //   //update user profile

  //   await User.updateOne({ email }, { name: data.name });
  // }

  await User.updateOne({ email }, data);
  console.log("data", data);

  return Response.json(true);
}

export async function GET() {
  mongoConnect();
  //get the server session
  const session = await getServerSession(authOptions);
  //get current logged in user
  const email = session?.user.email;

  return Response.json(await User.findOne({ email }));
}
