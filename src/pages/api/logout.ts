import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

interface LogoutResponse {
  status: boolean;
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<LogoutResponse>) => {
  nookies.destroy({ res }, 'token', { path: '/' });
  res.status(200).json({ status: true });
};

export default handler;
