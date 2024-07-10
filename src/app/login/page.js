// pages/login.js
"use client"; // Indique que ce composant est un composant client

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Utilisez 'next/navigation' au lieu de 'next/router'
import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "../../../oktaConfig";
import Image from "next/image";
import Link from "next/link";


const oktaAuth = new OktaAuth(oktaConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const transaction = await oktaAuth.signInWithCredentials({ 
        username: email, 
        password: password 
      });

      if (transaction.status === 'SUCCESS') {
        document.cookie = `okta-session-token=${transaction.sessionToken}; path=/;`;
        oktaAuth.tokenManager.setTokens(transaction.tokens);
        router.push('/dashboard');
      } else {
        console.log('Authentication failed: ', transaction);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  return (
    <main className="flex min-h-screen  items-center justify-start p-24 h-4/6">
      <div className="flex flex-col justify-start items-center h-96 w-full gap-32">
      <Link
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
            >
              Retour en arrière{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </Link>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://manage.auth0.com/dashboard/eu/dev-fw0hwnkbbpt8a7d4/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Auth with{" "}
              <Image
                src="/Okta_logo.svg"
                alt="Okta Logo"
                className="dark:invert"
                width={200}
                height={48}
                priority
              />
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-screen flex justify-center content-center align-middle place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <form onSubmit={handleSubmit} className="relative w-1/3">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="adresse@mail.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Se souvenir de moi
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
