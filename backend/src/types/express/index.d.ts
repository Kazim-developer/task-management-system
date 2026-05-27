import { User } from "@prisma/client";

declare global {
  declare namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}

export {};
