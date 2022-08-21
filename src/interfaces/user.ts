enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MEMBERSHIP = "MEMBERSHIP",
  BETA = "BETA",
}

interface User {
  id?: number | null;
  username?: string | null;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  biography?: string | null;
  location?: string | null;
  role?: Role;
}

export type { User };
export { Role };
