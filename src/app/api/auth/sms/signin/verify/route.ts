import connectToDB from "configs/db";
import otpModel from "models/Otp";
import userModel from "models/User";
import { zVerifySchema } from "schemas/otp";
import { generateAccessToken, generateRefreshToken } from "utils/auth";

export async function POST(req: Request) {
  try {
    const reqBody = (await req.json()) as {
      code: string;
      phone: string;
    };

    const validationResult = zVerifySchema.safeParse(reqBody);

    if (!validationResult.success) {
      return Response.json(
        {
          message: "Invalid data",
          error: validationResult.error.formErrors.fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDB();
    const user = await userModel.exists({ phone: validationResult.data.phone });

    if (!user)
      return Response.json({ message: "user not found...!" }, { status: 404 });

    const result = await otpModel.findOne(validationResult.data);

    if (!result || result.isExpired)
      return Response.json({ message: "No records found" }, { status: 404 });

    const now = new Date().getTime();

    if (now > result.expTime) {
      return Response.json({ message: "code expired" }, { status: 410 });
    }

    await otpModel.findByIdAndUpdate(result._id, {
      isExpired: true,
    });

    const accessToken = generateAccessToken({
      phone: validationResult.data.phone,
    });
    const refreshToken = generateRefreshToken({
      phone: validationResult.data.phone,
    });

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${accessToken};path=/;sameSite=none;httpOnly=true`
    );
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;sameSite=none;httpOnly=true`
    );

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    return Response.json(
      { message: "user signed in...!" },
      {
        status: 200,
        headers,
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
