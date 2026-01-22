import { verifyToken } from "@/lib/auth";

export function getAuthUser(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.split(" ")[1];
  return verifyToken(token);
}
