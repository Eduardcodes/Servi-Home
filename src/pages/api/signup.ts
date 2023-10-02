import { db } from '../../lib/db';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const hashedPassword: string = await hash(password, 10);

      const user = await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: { id: true, email: true, username: true },
      });

      const token = sign({ userId: user.id}, secretKey, {
        expiresIn: '1h',
      });

      res
        .status(201)
        .json({ message: 'User registered successfully', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to register user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
