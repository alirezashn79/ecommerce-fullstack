import { generateAccessToken, hashPassword } from "@/utils/auth";
import connectToDB from "configs/db";
import userModel from "models/User";
import { userSchema } from "schemas/auth";
import { TUserCreate } from "types/auth";

export async function POST(req: Request) {
  try {
    const body: TUserCreate = await req.json();

    // validation
    try {
      await userSchema.validate(body, {
        abortEarly: false,
      });
    } catch (error) {
      return Response.json(
        { message: "invalid data...!", error },
        {
          status: 400,
        }
      );
    }

    // connect to db
    await connectToDB();

    // user exist
    const isUserExist = await userModel.exists({
      $or: [{ name: body.name }, { email: body.email }, { phone: body.phone }],
    });

    if (isUserExist) {
      return Response.json(
        { message: "user already exist" },
        {
          status: 422,
        }
      );
    }

    // hash password
    const hashedPassword = body.password
      ? await hashPassword(body.password)
      : undefined;

    // generate access token
    const token = generateAccessToken({ name: body.name, phone: body.phone });

    // user type
    const users = await userModel.find({}, "_id");

    // create user
    await userModel.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    return Response.json(
      { message: "user signed up...!" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error...!", error },
      {
        status: 500,
      }
    );
  }
}
