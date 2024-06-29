"use client";

import ListUI from '@/components/Lists/ListUI'
import { Footer, SearchBar } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Favs() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/signin'); // Redirect to sign in page
  }, [session, status, router]);

  if (!session) {
    return <div></div>;
  }


  return (
    <>
    <ToastContainer/>
    <SearchBar/>
    <ListUI/>
    <Footer/>
    </>
  );
}