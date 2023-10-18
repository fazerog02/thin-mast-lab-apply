import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormData, LoginFormDataSchema } from '@/schemas/user';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = nookies.get(ctx).token;
  if (jwt !== undefined) {
    return {
      redirect: {
        destination: '/vote',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function IndexPage() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormDataSchema),
    mode: 'onTouched',
    defaultValues: {
      user_id: '',
      password: '',
    },
  });

  const login = async (data: LoginFormData): Promise<void> => {
    if (isFetching) return;

    setIsFetching(true);
    const res = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(data),
    });
    setIsFetching(false);

    console.log(await res.json());
  };

  return (
    <main className='px-10'>
      <div className='p-4'>
        <h2>ログイン</h2>
        <form className='flex flex-col' onSubmit={handleSubmit(login)}>
          <label htmlFor='user_id'>ユーザーID</label>
          <input id='user_id' {...register('user_id')} />
          {errors.user_id ? <p>{errors.user_id.message}</p> : null}
          <label htmlFor='user_id'>パスワード</label>
          <input id='password' type='password' {...register('password')} />
          {errors.password ? <p>{errors.password.message}</p> : null}
          <button type='submit'>ログイン</button>
        </form>
      </div>
    </main>
  );
}
