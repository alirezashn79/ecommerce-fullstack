import connectToDB from "configs/db";
import otpModel from "models/Otp";
import userModel from "models/User";
import { zVerifySchema } from "schemas/otp";
import { generateAccessToken } from "utils/auth";

export async function POST(req: Request) {
  try {
    const reqBody = (await req.json()) as {
      code: string;
      phone: string;
    };

    const validationResult = zVerifySchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        { message: "Invalid data", error: validationResult.error.errors },
        {
          status: 400,
        }
      );
    }
    await connectToDB();
    const result = await otpModel.findOne(validationResult.data);

    if (!result) {
      const isExist = await otpModel.exists({
        phone: validationResult.data.phone,
      });

      if (isExist) {
        const existedOtp = await otpModel.findByIdAndUpdate(isExist._id, {
          $inc: {
            usedTime: 1,
          },
        });

        if (existedOtp.usedTime >= 3) {
          await otpModel.findByIdAndDelete(isExist._id);
          return Response.json({ message: "try  later" }, { status: 409 });
        }
      }
      return Response.json({ message: "code is invalid" }, { status: 409 });
    }

    const now = new Date().getTime();
    if (now > result.expTime) {
      await otpModel.findByIdAndDelete(result._id);
      return Response.json({ message: "code expired" }, { status: 410 });
    }

    const token = generateAccessToken({ phone: reqBody.phone });

    await otpModel.deleteMany({ phone: reqBody.phone });

    await userModel.create({
      phone: reqBody.phone,
      email: `${reqBody.phone}@gmail.com`,
    });

    return Response.json(
      { message: "user signed up...!" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token};path=/;httpOnly=true;;max-age=3600`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
