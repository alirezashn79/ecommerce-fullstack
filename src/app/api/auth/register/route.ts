import connectToDB from "configs/db";

export async function GET(req: Request) {
  await connectToDB();

  return Response.json(
    { message: "Test Response" },
    {
      status: 201,
    }
  );
}
