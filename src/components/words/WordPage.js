import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
} from "../MaterialTailwind";

import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AddWord } from '@/components/words/AddAword'

export const WordPage = ({ definition }) => {
  const meanings = definition.meanings || [];
  const phonetics = definition.phonetics || [];
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    if (!session) {
      router.push('/signin'); // Redirigir al inicio de sesión si no está autenticado
    } else {
      setOpen((cur) => !cur); // Abrir el diálogo si está autenticado
    }
  };

  // Función para reproducir el audio
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

    // Función para manejar el clic en el botón de volumen
    const handleVolumeClick = () => {
      if (phonetics.length > 0 && phonetics[0].audio) {
        playAudio(phonetics[0].audio); // Reproduce el primer audio disponible
      }
    };

  return (
    <div className="min-h-screen bg-white text-black p-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-left mb-10 flex">
          <h1 className="text-5xl font-bold">{definition.word}</h1>
          <div className="ml-4 flex space-x-2 md:inline-block">
            <IconButton onClick={handleVolumeClick} color="black" variant="outlined" size="lg"><i class="fa-solid fa-volume-high" ></i></IconButton>
            <IconButton onClick={handleOpen} color="black" variant="outlined" size="lg">
              <i className="fas fa-star" />
            </IconButton>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <AddWord word={definition.word} onClose={handleOpen} />
            </Dialog>
          </div>
        </header>
        <main className="grid grid-cols-3 gap-8">
          <section className="col-span-2">
            {meanings.map((meaning, index) => (
              <div key={index} className={`mb-8 ${index < meanings.length - 1 ? 'pb-8 border-b border-gray-300' : ''}`}>
                <h2 className="text-lg text-gray-600">{meaning.partOfSpeech}</h2>
                {meaning.definitions.map((def, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-1xl">{idx + 1}. {def.definition}</p>
                    {def.example && <p className="italic text-gray-600">"{def.example}"</p>}
                    {def.synonyms && def.synonyms.length > 0 && (
                      <p className="mt-4">
                        <span className="text-gray-600">sinónimos: </span>
                        {def.synonyms.map((synonym, idx) => (
                          <span key={idx}>
                            <a href={`/search/${synonym}`} className="text-blue-500">{synonym}</a>
                            {idx < def.synonyms.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </section>
          <aside className="space-y-8">
            <div>
              <h2 className="text-lg text-gray-600">Phonetics</h2>
              {phonetics.map((phonetic, index) => (
                <div key={index} className="mb-8">
                  <p className="text-1xl">{phonetic.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default WordPage;

