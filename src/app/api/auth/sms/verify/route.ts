import connectToDB from "configs/db";
import otpModel from "models/Otp";
import { zVerifySchema } from "schemas/otp";

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
          status: 422,
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

    await otpModel.deleteMany({ phone: result.phone });

    return Response.json({
      message: "verify otp successfully",
    });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
