export function validateAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

export function requireAdmin(request: Request): { authorized: boolean } {
  const password = request.headers.get("x-admin-password") || "";
  return { authorized: validateAdminPassword(password) };
}
