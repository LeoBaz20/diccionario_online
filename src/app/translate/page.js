// components
"use client";

import { TranslateProvider } from "@/contexts/contextTranslation";
import { TranslateUI, Footer, TranslateFavs} from "../../components";

// sections

export default function Campaign() {
  return (
    <>
    <TranslateProvider>
      <div className="flex flex-col items-center space-y-10 min-h-screen bg-gray-100 p-4 md:p-8">
      <TranslateUI/>
      <TranslateFavs/>
      </div>
      </TranslateProvider>
      <Footer/>
    </>
  );
}
