"use server";
import { Prisma, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User | null> => {
  try {
    const db = new PrismaClient();
    const res = await db.user.create({
      data,
    });
    await db.$disconnect();
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
