import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignUpFormData, SignUpFormDataSchema } from '@/schemas/user';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormDataSchema),
    mode: 'onTouched',
    defaultValues: {
      user_id: '',
      password: '',
    },
  });

  const signup = async (data: SignUpFormData) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };

  return (
    <main className='px-10'>
      <div className='p-4'>
        <form className='flex flex-col' onSubmit={handleSubmit(signup)}>
          <label htmlFor='user_id'>ユーザーID</label>
          <input id='user_id' {...register('user_id')} />
          {errors.user_id ? <p>{errors.user_id.message}</p> : null}
          <label htmlFor='user_id'>パスワード</label>
          <input id='password' type='password' {...register('password')} />
          {errors.password ? <p>{errors.password.message}</p> : null}
          <button type='submit'>登録する</button>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
