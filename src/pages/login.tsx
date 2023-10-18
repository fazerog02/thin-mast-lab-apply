import { ChangeEvent, useState } from 'react';

const LoginPage = () => {
  const [token, setToken] = useState<string>('');

  const login = () => {
    fetch('/api/login', {
      method: 'POST',
      body: token,
    });
  };

  return (
    <>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
        value={token}
      />
      <button onClick={login}>login</button>
    </>
  );
};

export default LoginPage;
