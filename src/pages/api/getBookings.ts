import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (
  req: NextApiRequest, 
  res: NextApiResponse) => {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const bookings = await prisma.booking.findMany({
      include: {
        address: true,
        services: true,
        user: true,
      },
    });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};
