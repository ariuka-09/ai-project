export async function GET() {
  const todos = [{ name: "ariun" }, { name: "burhan" }];
  return Response.json(todos);
}
