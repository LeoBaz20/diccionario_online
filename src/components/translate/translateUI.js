import { useState } from "react";
import { ArrowsRightLeftIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu, MenuHandler, MenuList, MenuItem, Button, Sidebar} from "../MaterialTailwind";

const languages = [
  { "code": "BG", "name": "Búlgaro" },
  { "code": "CS", "name": "Checo" },
  { "code": "DA", "name": "Danés" },
  { "code": "DE", "name": "Alemán" },
  { "code": "EL", "name": "Griego" },
  { "code": "EN-GB", "name": "Inglés (Británico)" },
  { "code": "EN-US", "name": "Inglés (Americano)" },
  { "code": "ES", "name": "Español" },
  { "code": "ET", "name": "Estonio" },
  { "code": "FI", "name": "Finlandés" },
  { "code": "FR", "name": "Francés" },
  { "code": "HU", "name": "Húngaro" },
  { "code": "ID", "name": "Indonesio" },
  { "code": "IT", "name": "Italiano" },
  { "code": "JA", "name": "Japonés" },
  { "code": "KO", "name": "Coreano" },
  { "code": "LT", "name": "Lituano" },
  { "code": "LV", "name": "Letón" },
  { "code": "NB", "name": "Noruego (Bokmål)" },
  { "code": "NL", "name": "Neerlandés" },
  { "code": "PL", "name": "Polaco" },
  { "code": "PT-BR", "name": "Portugués (Brasil)" },
  { "code": "PT-PT", "name": "Portugués (Europa)" },
  { "code": "RO", "name": "Rumano" },
  { "code": "RU", "name": "Ruso" },
  { "code": "SK", "name": "Eslovaco" },
  { "code": "SL", "name": "Esloveno" },
  { "code": "SV", "name": "Sueco" },
  { "code": "TR", "name": "Turco" },
  { "code": "UK", "name": "Ucraniano" },
  { "code": "ZH", "name": "Chino (Simplificado)" }
];

const targetLanguages = [
  { "code": "BG", "name": "Búlgaro" },
  { "code": "CS", "name": "Checo" },
  { "code": "DA", "name": "Danés" },
  { "code": "DE", "name": "Alemán" },
  { "code": "EL", "name": "Griego" },
  { "code": "EN-GB", "name": "Inglés (Británico)" },
  { "code": "EN-US", "name": "Inglés (Americano)" },
  { "code": "ES", "name": "Español" },
  { "code": "ET", "name": "Estonio" },
  { "code": "FI", "name": "Finlandés" },
  { "code": "FR", "name": "Francés" },
  { "code": "HU", "name": "Húngaro" },
  { "code": "ID", "name": "Indonesio" },
  { "code": "IT", "name": "Italiano" },
  { "code": "JA", "name": "Japonés" },
  { "code": "KO", "name": "Coreano" },
  { "code": "LT", "name": "Lituano" },
  { "code": "LV", "name": "Letón" },
  { "code": "NB", "name": "Noruego (Bokmål)" },
  { "code": "NL", "name": "Neerlandés" },
  { "code": "PL", "name": "Polaco" },
  { "code": "PT-BR", "name": "Portugués (Brasil)" },
  { "code": "PT-PT", "name": "Portugués (Europa)" },
  { "code": "RO", "name": "Rumano" },
  { "code": "RU", "name": "Ruso" },
  { "code": "SK", "name": "Eslovaco" },
  { "code": "SL", "name": "Esloveno" },
  { "code": "SV", "name": "Sueco" },
  { "code": "TR", "name": "Turco" },
  { "code": "UK", "name": "Ucraniano" },
  { "code": "ZH", "name": "Chino (Simplificado)" }
];

export function TranslateUI() {
  const [sourceLanguage, setSourceLanguage] = useState("detect");
  const [targetLanguage, setTargetLanguage] = useState("ES");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");


  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };


  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sourceLang: sourceLanguage === "detect" ? null : sourceLanguage.toLowerCase(),
          targetLang: targetLanguage.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translatedText);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error al traducir el texto:', error);
    }
  };

  

  return (
<div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 md:p-8">
    <div className="w-full max-w-7xl p-5 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <div className="flex w-full space-x-4">
          <Menu className="w-full">
            <MenuHandler>
              <Button className="w-full h-12" variant="text">
                {sourceLanguage === "detect" ? "Detectar Idioma" : languages.find(lang => lang.code === sourceLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="absolute top-0 left-0 w-screen h-screen bg-white md:grid md:grid-cols-3 md:w-auto md:h-auto md:bg-white md:relative md:top-auto md:left-auto">
              <MenuItem onClick={() => setSourceLanguage("detect")}>Detectar Idioma</MenuItem>
              {languages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setSourceLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <button
            className="flex items-center justify-center w-full h-12 p-2 text-black bg-white rounded-lg hover:bg-stone-50 md:w-auto"
            onClick={handleSwapLanguages}
            disabled={sourceLanguage === "detect"}
          >
            <ArrowsRightLeftIcon className="w-5 h-5" />
          </button>

          <Menu className="w-full">
            <MenuHandler>
              <Button className="w-full h-12" variant="text">
                {targetLanguages.find(lang => lang.code === targetLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="absolute top-0 left-0 w-screen h-screen bg-white md:grid md:grid-cols-3 md:w-auto md:h-auto md:bg-white md:relative md:top-auto md:left-auto">
              {targetLanguages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setTargetLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
      
        <div className="flex flex-col mt-4 md:flex-row md:space-x-4">
          <textarea
            className="w-full h-40 p-4 mb-4 border border-gray-300 rounded-lg resize-none md:w-1/2 md:h-60"
            placeholder="Ingrese el texto a traducir"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <textarea
            className="w-full h-40 p-4 mb-4 bg-gray-100 rounded-lg resize-none md:w-1/2 md:h-60"
            readOnly
            value={translatedText}
          ></textarea>
        </div>
        <button
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleTranslate}
        >
          Traducir
        </button>
      </div>
    </div>
  );
}

export default TranslateUI;
