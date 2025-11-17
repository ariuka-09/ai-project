import { User, UserSchema } from "@/models/users.schema";
import connectDB from "@/utils/mongodb";

export async function GET() {
  connectDB();
  const todos = { name: "do" };
  return Response.json(todos);
}
export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  await User.create(body);
  return Response.json({ message: "negro" });
}
