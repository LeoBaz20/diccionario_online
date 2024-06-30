import Link from "next/link";
import { Breadcrumbs} from "../MaterialTailwind";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LDCard from "./LDCard";
import WordCard from "./WordCard";


const ListDetailsUI = ({ id }) => {
  const { data: session } = useSession();
  const [listDetails, setListDetails] = useState(null);
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/lists/getById?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setListDetails(data);
          } else {
            console.error('Error fetching lists:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching lists:', error);
        }
      }
    };

    fetchListDetails();
  }, [id, session]);

  useEffect(() => {
    const fetchWords = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/words/getByListId?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setWords(data);
          } else {
            console.error('Error fetching words:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      }
    };

    fetchWords();
  }, [id, session]);

  if (!listDetails || words === null) {
    return <div></div>;
  }


  return (
    <div className="min-h-screen bg-white p-10">
      <main className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Breadcrumbs className="bg-transparent">
            <Link href="/Lists" className="opacity-60">
              Listas
            </Link>
            <a href="#">{listDetails.name}</a>
          </Breadcrumbs>
        </div>
        <div className="space-y-10">
          <LDCard name={listDetails.name} wordCount={listDetails.wordCount} />
          <div>
          <hr className="my-3 border-t-2 border-gray" />
            <div className="space-y-2">
              {words.map((wordObj) => (
                <WordCard key={wordObj.id} wordObj={wordObj}/>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ListDetailsUI;