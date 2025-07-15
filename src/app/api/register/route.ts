import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

// export async function POST(req: any, res: any) {
//   const body = await req.json();

//   mongoose.connect(process.env.MONGO_URL || "");

//   const createdUser = await User.create(body);

//   console.log("Response from register", res);

//   return { createdUser, res };
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await mongoConnect();

    // const pass = body.password;
    // if (!pass.length || pass.lenght < 5) {
    //   new Error("password must be at least 5 charaters");
    // }

    // const notHashed = pass;
    // const salt = bcrypt.genSaltSync(10);
    // body.password = bcrypt.hashSync(notHashed, salt);

    const createdUser = await User.create(body);

    return NextResponse.json({ user: createdUser }, { status: 201 });
  } catch (error: any) {
    // Log error in the server terminal
    console.error("Error during user creation:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 } // Conflict
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
