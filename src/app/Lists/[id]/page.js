"use client";

import { Footer, SearchBar } from '@/components';
import ListDetailsUI from '@/components/ListDetails/ListDetailsUI';
import { useParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListDetail = () => {
  const { id } = useParams();

  return (
    <>
    <ToastContainer/>
    <SearchBar/>
    <ListDetailsUI id={id}/>
    <Footer/>
    </>
  );
};

export default ListDetail;
