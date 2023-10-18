import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { firestoreDB } from '@/firebase/admin';
import { LoginFormData, LoginFormDataSchema } from '@/schemas/user';
import { setToken } from '@/utils/auth';

interface ResponseData {
  status: boolean;
  message?: string;
}

const authUser = async (data: LoginFormData): Promise<boolean> => {
  const user = (await firestoreDB.collection('Users').doc(data.user_id).get()).data();
  if (!user || !user.password) return false;

  return await bcrypt.compare(data.password, user.password);
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const req_json = JSON.parse(req.body);
    const data = LoginFormDataSchema.parse(req_json);

    if (!(await authUser(data))) {
      res.status(400).json({ status: false, message: 'ユーザーIDまたはパスワードが違います' });
      return;
    }

    setToken(res, data.user_id);
    res.status(200).json({ status: true });
  } catch (e: any) {
    if (e instanceof SyntaxError || e instanceof ZodError) {
      res.status(400).json({ status: false, message: '入力データが無効な形式です' });
      return;
    }
    res.status(400).json({ status: false, message: '不明なエラーです' });
  }
};

export default handler;
