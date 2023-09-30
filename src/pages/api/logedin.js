import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); 
  }

  const { services, address, userId } = req.body;

  try {
    const createdAddress = await prisma.address.create({
      data: {
        detail: address,
        userId: userId
      },
    });
    
    const booking = await prisma.booking.create({
      data: {
        userId: userId,
        addressId: createdAddress.id,
        status: "PENDING"
      }
    });

    for(let service of services) {
      const serviceData = {
        bookingId: booking.id,
        type: service.title,
        description: JSON.stringify([
          { attribute: "rugmeasure", value: service.rugmeasure },
          { attribute: "rugcondition", value: service.rugcondition },
          { attribute: "measure", value: service.measure },
          { attribute: "condition", value: service.condition },
          { attribute: "material", value: service.material },
          { attribute: "servicetable", value: service.servicetable }
      ]),
      };

      await prisma.service.create({ data: serviceData });
    }

    return res.status(200).json({ message: 'Order successfully saved!' });
  } catch (error) {
    console.error("Error saving order:", error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  } finally {
    await prisma.$disconnect(); 
  }
};


