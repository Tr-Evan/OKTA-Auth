// pages/dashboard.js
"use client"; // Indique que ce composant est un composant client

import { getSession, withPageAuthRequired } from "@okta/okta-react";

export const getServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Contenu de votre dashboard */}
    </div>
  );
};

export default withPageAuthRequired(Dashboard);
