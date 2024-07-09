// components
import { Footer, SearchBar } from "@/components";

// sections
import Hero from  "./hero";
import Section from "./section";

export default async function Campaign() {
  return (
    <>
      <SearchBar/>
      <Hero />
      <Section />
      <Footer />
    </>
  );
}