import { db } from "../../lib/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";


const secretKey : string = process.env.JWT_SECRET; 

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse) {
    if(req.method === 'POST') {
      const{email, password} = req.body
      try {
        const cleaner = await db.cleaner.findUnique({
          where: { email },
          select: { id: true, email: true, username: true, password: true } 
        });

        if (!cleaner || !await compare(password, cleaner.password)) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = sign({ userId: cleaner.id}, secretKey, { expiresIn: "1h" });
        const { password: _, ...cleanerWithoutPassword } = cleaner;
        res.status(200).json({ message: 'User authenticated successfully', cleaner: cleanerWithoutPassword, token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
      
}