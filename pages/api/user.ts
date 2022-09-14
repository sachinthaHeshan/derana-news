// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../modules/shared/utils/firebase';
import { adminAuth } from '../../modules/shared/utils/firebase-admin';

type Data = {
  name?: string | null;
  error?: string | null;
  uid?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  userRole?: string | null;
};

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const querySnapshot = await getDocs(collection(db, 'users'));

    querySnapshot.forEach((docs) => {
      console.log(`${docs.id} => ${JSON.stringify(docs.data())}`);
    });

    res.status(200).json({ name: 'John Doe GET' });
  } else if (req.method === 'POST') {
    console.log('POST');
    try {
      if (!req.headers.token) {
        return res.status(401).json({ error: 'Please include id token' });
      }

      const { uid } = await adminAuth.verifyIdToken(req?.headers?.token as string);

      if (uid) {
        const createUserResponse = await createUserWithEmailAndPassword(auth, req?.body?.email, req?.body?.password);

        await addDoc(collection(db, 'users'), {
          uid: createUserResponse?.user?.uid,
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: createUserResponse?.user?.email,
          userRole: req?.body?.userRole,
          createdAt: new Date().toISOString(),
        });

        res.status(200).json({
          uid: createUserResponse?.user?.uid,
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: createUserResponse?.user?.email,
          userRole: req?.body?.userRole,
        });
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.status(500).json({ error: error?.code });
      console.log(99999, error);
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

    res.status(200).json({ name: 'John Doe PATCH' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ name: 'John Doe DELETE' });
  }
}
