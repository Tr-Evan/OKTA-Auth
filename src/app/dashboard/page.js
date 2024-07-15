// src/app/dashboard/page.js

import { getSession } from '@auth0/nextjs-auth0';

export async function getServerSideProps(context) {
  const session = getSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // passe des props si nécessaire
  };
}

export default function Dashboard() {
  return (
    <div>
      <h1>Bienvenue sur le tableau de bord</h1>
      {/* Contenu protégé */}
    </div>
  );
}
