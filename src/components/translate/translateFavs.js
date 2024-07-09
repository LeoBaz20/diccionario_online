import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Accordion, AccordionHeader, AccordionBody, Typography, IconButton, Tooltip } from "../MaterialTailwind";
import { languages, targetLanguages } from "@/lib/languajeData";
import { useTranslate } from "@/contexts/contextTranslation";
import { XCircleIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OTHeartIcon } from '@heroicons/react/24/outline';

export function TranslateFavs() {
  const [open, setOpen] = useState(0);
  const [translations, setTranslations] = useState([]);
  const { data: session } = useSession();
  const { savedTranslations, removeTranslation } = useTranslate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const getLanguageName = (code, languages) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/translatedtext/getByUserId?userId=${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setTranslations(data);
            console.log(data);
          } else {
            console.error('Error fetching translations:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching translations:', error);
        }
      }
    };

    fetchTranslations();
  }, [session]);

  const handleDeleteTranslation = async (translationId) => {
    try {
      const response = await fetch(`/api/translatedtext/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: translationId }),
    });
      if (response.ok) {
        setTranslations(translations.filter((t) => t.id !== translationId));
        removeTranslation(translationId);
      } else {
        console.error('Failed to delete translation:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting translation:', error);
    }
  };

    // Merge saved translations from context with translations from database
    useEffect(() => {
      if (savedTranslations.length > 0) {
        setTranslations(prevTranslations => [...prevTranslations, ...savedTranslations]);
      }
    }, [savedTranslations]);

    return (
      <div className="w-full max-w-7xl p-5 bg-white border border-gray-200 rounded-lg shadow-md">
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Traducciones Guardadas
          </AccordionHeader>
          <AccordionBody>
            {session ? (
              translations.length > 0 ? (
                <ul>
                  {translations.map((translation) => (
                    <li key={translation.id} className="py-2 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <div className="p-2 border border-gray-300 rounded-md mb-2">
                          {getLanguageName(translation.sourceLanguage, languages)} → {getLanguageName(translation.targetLanguage, targetLanguages)}
                        </div>
                        <Typography variant="h6">{translation.originalText}</Typography><br />
                        <Typography>{translation.translatedText}</Typography><br />
                      </div>
                      <Tooltip content="Dejar de guardar" className="border border-blue-gray-50 bg-white text-black">
                        <IconButton
                          variant="text"
                          color="blue"
                          onClick={() => handleDeleteTranslation(translation.id)}
                        >
                          <XCircleIcon className="h-5 w-5"/>
                        </IconButton>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay traducciones guardadas.</p>
              )
            ) : (
              <p>Para guardar traducciones, debe <a href="/signin" className="underline text-blue-600">iniciar sesión</a>.</p>
            )}
          </AccordionBody>
        </Accordion>
      </div>
    );
}

export default TranslateFavs;
