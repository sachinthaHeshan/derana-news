// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { uuid } from 'uuidv4';
import { db } from '../../../modules/shared/utils/firebase';
import { adminAuth } from '../../../modules/shared/utils/firebase-admin';

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
      const requestedCategory = req?.query?.category;
      let querySnapshot;

      if (requestedCategory) {
        querySnapshot = await getDocs(
          query(collection(db, 'news'), where('category', '==', requestedCategory), orderBy('createdAt', 'desc')),
        );
      } else {
        querySnapshot = await getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(8)));
      }

      const newsList: Data[] = [];

      querySnapshot?.forEach((docs) => {
        newsList.push(<Data>docs.data());
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
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));

        let userRole;

        await querySnapshot?.forEach((userData) => {
          userRole = userData?.data()?.userRole;
        });

        if (userRole && ['admin', 'editor'].includes(userRole)) {
          const newNews = {
            id: uuid(),
            headline: req?.body?.headline,
            content: req?.body?.content,
            imageURL: req?.body?.imageURL,
            category: req?.body?.category,
            writerUID: uid,
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'news', newNews.id), newNews);
          return res.status(200).json(newNews);
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
          const newNews = {
            headline: req?.body?.headline,
            content: req?.body?.content,
            imageURL: req?.body?.imageURL,
            category: req?.body?.category,
            editorUID: uid,
            updatedAt: new Date().toISOString(),
          };

          const washingtonRef = doc(db, 'news', req?.body?.id);

          await updateDoc(washingtonRef, newNews);

          return res.status(200).json(newNews);
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
          await deleteDoc(doc(db, 'news', req?.headers?.id as string));

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
