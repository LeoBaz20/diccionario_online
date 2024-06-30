import { useState } from "react";
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
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
  const [savedTranslations, setSavedTranslations] = useState([]);
  const [showSavedTranslations, setShowSavedTranslations] = useState(false);


  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const toggleSavedTranslations = () => {
    setShowSavedTranslations(!showSavedTranslations);
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-7xl p-5 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Menu>
            <MenuHandler>
              <Button className="w-full md:w-1/2 h-12 border-gray-300" variant="outlined">
                {sourceLanguage === "detect" ? "Detectar Idioma" : languages.find(lang => lang.code === sourceLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <MenuItem onClick={() => setSourceLanguage("detect")}>Detectar Idioma</MenuItem>
              {languages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setSourceLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <button
            className="flex items-center justify-center flex-shrink-0 w-12 h-12 p-2 mb-4 ml-auto text-black bg-white rounded-lg hover:bg-stone-50"
            onClick={handleSwapLanguages}
            disabled={sourceLanguage === "detect"}
          >
            <ArrowsRightLeftIcon className="w-6 h-6" />
          </button>

          <Menu>
            <MenuHandler>
              <Button className="w-full md:w-1/2 h-12 border-gray-300" variant="outlined">
                {targetLanguages.find(lang => lang.code === targetLanguage).name}
              </Button>
            </MenuHandler>
            <MenuList className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {targetLanguages.map(lang => (
                <MenuItem key={lang.code} onClick={() => setTargetLanguage(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>

        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-4">
          <textarea
            className="w-full md:w-1/2 h-80 p-4 mb-4 border border-gray-300 rounded-lg resize-none focus:border-blue-300"
            placeholder="Ingrese el texto a traducir"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <textarea
            className="w-full md:w-1/2 h-80 p-4 mb-4 border border-gray-300 rounded-lg resize-none"
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
