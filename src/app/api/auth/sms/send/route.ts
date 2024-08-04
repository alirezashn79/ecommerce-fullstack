import otpModel from "models/Otp";
import { zPhoneSchema } from "schemas/otp";
import request from "request";
import connectToDB from "configs/db";
import userModel from "models/User";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const { phone } = reqBody;

    const validationResult = zPhoneSchema.safeParse({ phone });

    if (!validationResult.success) {
      return Response.json(
        { message: "phone number is invalid" },
        { status: 400 }
      );
    }

    await connectToDB();
    // const isExist = await userModel.countDocuments({ phone });

    // if (isExist > 0) {
    //   return Response.json(
    //     { message: "User Already Exist" },
    //     {
    //       status: 422,
    //     }
    //   );
    // }

    const code = Math.floor(Math.random() * 90000) + 10000;

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: process.env.WEB_SERVICE_USERNAME,
          pass: process.env.WEB_SERVICE_PASS,
          fromNum: "3000505",
          toNum: phone,
          patternCode: process.env.PATTERN_CODE,
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response) {
        if (!error && response.statusCode === 200) {
          await otpModel.create({
            phone,
            code,
          });
        } else {
          return Response.json(
            { message: "error to send code" },
            { status: 400 }
          );
        }
      }
    );

    return Response.json(
      { message: "code sent successfully" },
      { status: 201 }
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
