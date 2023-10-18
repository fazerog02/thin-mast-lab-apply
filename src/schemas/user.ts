import { z } from 'zod';

export const SignUpFormDataSchema = z.object({
  user_id: z.string().min(1, 'idは1文字以上で入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上にしてください')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])[\x21-\x7e]{8,}$/,
      'パスワードは数字と大文字アルファベットを少なくとも1つ以上含む半角英数字記号で入力してください'
    ),
});
export type SignUpFormData = z.infer<typeof SignUpFormDataSchema>;

export const LoginFormDataSchema = z.object({
  user_id: z.string().min(1, 'idは必須です'),
  password: z.string().min(1, 'パスワードは必須です'),
});
export type LoginFormData = z.infer<typeof LoginFormDataSchema>;
