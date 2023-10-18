import { GetServerSideProps } from 'next';
import nookies from 'nookies';

interface Props {
  jwt: string | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = nookies.get(ctx).token;

  if (jwt === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      jwt: jwt,
    },
  };
};

const TestPage = ({ jwt }: Props) => {
  if (jwt === null) {
    return <>NG!</>;
  } else {
    return <>OK! {jwt}</>;
  }
};

export default TestPage;
