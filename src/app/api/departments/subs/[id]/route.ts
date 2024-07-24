import connectToDB from "configs/db";
import subDepartmentModel from "models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // codes
    if (!isValidObjectId(params.id)) {
      return Response.json(
        { message: "id is invalid...!" },
        {
          status: 422,
        }
      );
    }

    await connectToDB();
    const subDepartments = await subDepartmentModel.find({
      department: params.id,
    });

    return Response.json(subDepartments);
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      {
        status: 500,
      }
    );
  }
}
