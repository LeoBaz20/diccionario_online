// components
import { Footer, SearchBar } from "@/components";

// sections
import Hero from  "./hero";

export default async function Campaign() {
  return (
    <>
      <SearchBar/>
      <Hero />
      <Footer />
    </>
  );
}