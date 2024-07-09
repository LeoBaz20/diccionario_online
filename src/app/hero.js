"use client";

import Image from "next/image";
import {Typography} from "@material-tailwind/react";

function Hero() {
  return (
    <header className="relative mt-0 bg-white p-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/122.png"
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative w-full container mx-auto pt-12 pb-24 text-center">
        <Typography
          color="white"
          className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
        >
          Explora el mundo a través de las palabras
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto mt-8 mb-4 w-full px-8 !text-white lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
        >
          Explora un diccionario multilingüe con traducciones precisas, definiciones claras y pronunciaciones nativas.
        </Typography>
      </div>
    </header>
  );
}

export default Hero;