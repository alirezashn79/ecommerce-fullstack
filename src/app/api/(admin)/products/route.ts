import { baseURL } from "configs/baseUrl";
import connectToDB from "configs/db";
import { writeFile } from "fs/promises";
import productModel from "models/Product";
import path from "path";
import { zServerImageSchema } from "schemas/img";
import { ZProductSchema } from "schemas/products";
import { authUser } from "utils/serverHelpers";

export async function POST(req: Request) {
  try {
    const user = await authUser();

    let typedUser;
    if (!user || typeof user !== "object") {
      return Response.json(
        { message: "You are not login yet...!" },
        {
          status: 401,
        }
      );
    }

    typedUser = user as {
      _id: string;
      role: "ADMIN" | "USER";
    };

    if (typedUser.role !== "ADMIN") {
      return Response.json(
        { message: "Only admins can perform this action" },
        {
          status: 403,
        }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = Number(formData.get("weight"));
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = JSON.parse(formData.get("tags") as string);
    const inventory = Number(formData.get("inventory"));
    const img = formData.get("img") as File;

    const body = {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      inventory,
      img,
    };

    const validationResult =
      ZProductSchema.and(zServerImageSchema).safeParse(body);

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

    const fileName = `${Date.now()}-${img.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    const fileUrl = `${baseURL}/uploads/${fileName}`;

    const arrayBuffer = await img.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer) as any;

    await writeFile(filePath, buffer);

    await connectToDB();

    const product = await productModel.create({
      ...validationResult.data,
      img: fileUrl,
    });

    return Response.json(
      { message: "product created successfully 😊", data: product },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the product", error },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const product = await productModel
      .find({}, "-__v")
      .populate("comments", "-__v");

    return Response.json(product, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "An error occurred creating the product", error },
      {
        status: 500,
      }
    );
  }
}

// export async function PUT(req: Request) {
//   try {
//     const formData = await req.formData();
//     const img = formData.get("img") as File;
//     const validationResult = zImageSchema.safeParse({ img });
//     if (!validationResult.success) {
//       return Response.json(
//         {
//           message: "invalid data",
//           error: validationResult.error.formErrors.fieldErrors,
//         },
//         {
//           status: 422,
//         }
//       );
//     }

//     const arrayBuffer = await img.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer) as any;

//     const fileName = `${Date.now()}-${img.name}`;

//     const filePath = path.join(process.cwd(), "public", "uploads", fileName);

//     await writeFile(filePath, buffer);

//     return Response.json({ message: "image uploaded successfully" });
//   } catch (error) {
//     return Response.json(
//       { message: "Server Error", error },
//       {
//         status: 500,
//       }
//     );
//   }
// }
