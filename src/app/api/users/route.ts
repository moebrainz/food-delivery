import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { User } from "@/app/models/User";

export async function GET() {
  mongoConnect();
  const result = await User.find();
  return Response.json(result);
}
