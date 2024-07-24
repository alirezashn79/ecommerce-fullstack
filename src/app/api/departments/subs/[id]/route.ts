import connectToDB from "configs/db";
import subDepartmentModel from "models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const id = params.id;
    await connectToDB();

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is invalid" },
        {
          status: 400,
        }
      );
    }

    const result = await subDepartmentModel.findById(id);

    return Response.json(result);
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
