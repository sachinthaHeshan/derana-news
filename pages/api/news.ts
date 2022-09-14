// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { uuid } from 'uuidv4';
import { db } from '../../modules/shared/utils/firebase';
import { adminAuth } from '../../modules/shared/utils/firebase-admin';

type Data = {
  error?: string;
  id?: string;
  name?: string;
  headline?: string;
  content?: string;
  imageURL?: string;
  writerUID?: string;
  category?: string;
  news?: Data[];
};

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const newsList: Data[] = [];

      querySnapshot?.forEach((docs) => {
        newsList.push(docs.data());
      });

      return res.status(200).json({ news: newsList });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ error: error?.code });
    }
  } else if (req.method === 'POST') {
    try {
      if (!req.headers.token) {
        return res.status(401).json({ error: 'Please include id token' });
      }

      const { uid } = await adminAuth.verifyIdToken(req?.headers?.token as string);

      if (uid) {
        const newNews = {
          id: uuid(),
          headline: req?.body?.headline,
          content: req?.body?.content,
          imageURL: req?.body?.imageURL,
          category: req?.body?.category,
          writerUID: uid,
          createdAt: new Date().toISOString(),
        };
        await addDoc(collection(db, 'news'), newNews);
        return res.status(200).json(newNews);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ error: error?.code });
    }
  } else if (req.method === 'PATCH') {
    const citiesRef = collection(db, 'users');

    await setDoc(doc(citiesRef, '7B0mpEdTLAT7IEZTx0eo'), {
      name: 'San Francisco',
      state: 'CAss',
      country: 'USA',
      capital: false,
      population: 666666,
    });

    return res.status(200).json({ name: 'John Doe PATCH' });
  } else if (req.method === 'DELETE') {
    return res.status(200).json({ name: 'John Doe DELETE' });
  }
}
