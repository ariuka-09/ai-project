import { User, UserSchema } from "@/models/users.schema";
import connectDB from "@/utils/mongodb";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await request.json();
  await User.create(body);
  return Response.json({ message: "negro" });
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  console.log("req", request.body);
  const { id } = params;
  const user = await User.findByIdAndDelete(id);
  return Response.json(user);
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  console.log("req", request.body);
  const { id } = params;
  const { body } = request;
  const user = await User.findByIdAndUpdate(id, body);
  return Response.json(user);
}
