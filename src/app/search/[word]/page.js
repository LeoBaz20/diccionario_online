"use client";

// app/[word]/page.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Head from 'next/head';
import { Footer, SearchBar, WordPage } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const WordPageContainer = () => {
  const { word } = useParams(); // Reemplazar useRouter con useParams
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (word) {
      const fetchDefinition = async () => {
        try {
          const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          setDefinition(response.data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDefinition();
    }
  }, [word]);

  if (loading) {
    return <div>
    </div>;
  }

  if (!definition) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
          <h1 className="text-6xl font-bold mb-8">Palabra no encontrada</h1>
          <p className="text-2xl mb-4">Lo sentimos, la palabra que buscas no existe.</p>
          <Link href="/" className="text-blue-500 hover:underline"> 
          Volver a la página principal
          </Link>
        </div>
      );
  }

  return (
    <div>
      <ToastContainer />
      <Head>
        <title>{definition.word}</title>
      </Head>
      <SearchBar />
      <WordPage definition={definition} />
      <Footer />
    </div>
  );
}

export default WordPageContainer;
