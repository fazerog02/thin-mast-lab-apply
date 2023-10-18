import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { firestoreDB } from '@/firebase/admin';
import { SignUpFormData, SignUpFormDataSchema } from '@/schemas/user';
import { setToken } from '@/utils/auth';

interface ResponseData {
  status: boolean;
  message?: string;
}

const registerUser = async (data: SignUpFormData): Promise<ResponseData> => {
  const user = await firestoreDB.collection('Users').doc(data.user_id).get();
  if (user.exists)
    return {
      status: false,
      message: 'すでにIDが使用されています',
    };

  const hashed_password = await bcrypt.hash(data.password, 10);
  await firestoreDB.collection('Users').doc(data.user_id).set({
    password: hashed_password,
  });

  return {
    status: true,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    const req_json = JSON.parse(req.body);
    const data = SignUpFormDataSchema.parse(req_json);

    if (!data.user_id || !data.password) {
      return res
        .status(400)
        .json({ status: false, message: 'ユーザーIDまたはパスワードを入力してください' });
    }

    const result = await registerUser(data);
    if (!result.status) {
      return res.status(400).json({ status: false, message: result.message });
    }

    setToken(res, data.user_id);
    res.status(200).json({ status: true });
  } catch (e: any) {
    if (e instanceof SyntaxError || e instanceof ZodError) {
      res.status(400).json({ status: false, message: '入力データが無効な形式です' });
      return;
    }
    res.status(400).json({ status: false, message: `不明なエラーです: ${e}` });
  }
};

export default handler;
