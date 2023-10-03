import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../../lib/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (
  req: NextApiRequest, 
  res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { bookingId, cleanerData } = req.body;

  try {
    const id = cleanerData.cleaner.id
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'ACCEPTED',
        cleanerId: id
      },
      include: {
        address: true,
        services: true,
        user: true,
      },
    });
    
    await sendEmail();
    
    return res.status(200).json({data: updatedBooking, message: 'Very nice'});
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}`, data: null});
  } finally {
    await prisma.$disconnect();
  }
};
