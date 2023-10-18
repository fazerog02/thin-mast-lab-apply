// export const getServerSideProps: GetServerSideProps = async (_ctx) => {
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   };
// };

const LogoutPage = () => {
  fetch('/api/logout');
  return <></>;
};

export default LogoutPage;
