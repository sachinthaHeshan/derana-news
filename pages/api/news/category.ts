// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, deleteDoc, query, where, orderBy, updateDoc, doc, setDoc } from 'firebase/firestore';
import { uuid } from 'uuidv4';
import { adminAuth } from '../../../modules/shared/utils/firebase-admin';
import { db } from '../../../modules/shared/utils/firebase';

type Data = {
  error?: string;
  id?: string;
  name?: string;
  categories?: Data[];
};

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'category'), orderBy('createdAt', 'asc')));

      const categories: Data[] = [];

      querySnapshot?.forEach((docs) => {
        categories.push(<Data>docs.data());
      });

      return res.status(200).json({ categories });
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
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));

        let userRole;

        await querySnapshot?.forEach((userData) => {
          userRole = userData?.data()?.userRole;
        });

        if (userRole && ['admin', 'editor'].includes(userRole)) {
          const newCategory = {
            id: uuid(),
            name: req?.body?.name,
          };
          await setDoc(doc(db, 'category', newCategory.id), newCategory);
          return res.status(200).json(newCategory);
        }
        return res.status(401).json({ error: 'Unauthorised user' });
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ error: error?.code });
    }
  } else if (req.method === 'PATCH') {
    try {
      if (!req.headers.token) {
        return res.status(401).json({ error: 'Please include id token' });
      }

      const { uid } = await adminAuth.verifyIdToken(req?.headers?.token as string);

      if (uid) {
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));

        let userRole;

        await querySnapshot?.forEach((userData) => {
          userRole = userData?.data()?.userRole;
        });

        if (userRole && ['admin', 'editor'].includes(userRole)) {
          const newCategory = {
            id: uuid(),
            name: req?.body?.name,
          };

          const washingtonRef = doc(db, 'category', req?.body?.id);

          await updateDoc(washingtonRef, newCategory);

          return res.status(200).json(newCategory);
        }
        return res.status(401).json({ error: 'Unauthorised user' });
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ error: error?.code });
    }
  } else if (req.method === 'DELETE') {
    try {
      if (!req.headers.token) {
        return res.status(401).json({ error: 'Please include id token' });
      }

      const { uid } = await adminAuth.verifyIdToken(req?.headers?.token as string);

      if (uid) {
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));

        let userRole;

        await querySnapshot?.forEach((userData) => {
          userRole = userData?.data()?.userRole;
        });

        if (userRole && ['admin', 'editor'].includes(userRole)) {
          await deleteDoc(doc(db, 'category', req?.headers?.id as string));

          return res.status(200).json({ id: req?.headers?.id as string });
        }
        return res.status(401).json({ error: 'Unauthorised user' });
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ error: error?.code });
    }
  }
}
