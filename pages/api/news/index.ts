import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe get' });
  } else if (req.method === 'POST') {
    res.status(200).json({ name: 'John Doe post' });
  }
};
