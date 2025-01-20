"use server";

import { PrismaClient } from "@prisma/client";

export const getAllUsers = async () => {
  const db = new PrismaClient();
  try {
    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await db.$disconnect();
  }
};
