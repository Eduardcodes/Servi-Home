import { db } from "../../lib/db";
import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET; 

// this is a middleware function, use in get/post request
function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  
  verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user 
   next()
  })
}

export default async function handler(
  req:  NextApiRequest, 
  res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await db.user.findUnique({
        where: { email },
        select: { id: true, email: true, username: true, password: true } 
      });

      if (!user || !await compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // take out the expires and put back return info into token
      //const token = sign({ userId: user.id}, secretKey, { expiresIn: "1h" });

      const userToken = { userId: user.id }
      const token = sign( userToken, secretKey);

      
      const { password: _, ...userWithoutPassword } = user;
      //res.status(200).json({ message: 'User authenticated successfully', user: userWithoutPassword, token});
      res.status(200).json({ message: 'User authenticated successfully', token: token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
