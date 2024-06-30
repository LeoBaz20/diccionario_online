import React from "react";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ListCard from '@/components/Lists/ListCard';
import NewList from "./NewList";
import { Button, Dialog } from '../MaterialTailwind';
import { useRouter } from "next/navigation";

export function ListUI(){
  const { data: session } = useSession();
  const [userLists, setUserLists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (session) {
        try {
          const response = await fetch('/api/lists/get');
          if (response.ok) {
            const data = await response.json();
            setUserLists(data);
          } else {
            console.error('Error fetching lists:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching lists:', error);
        }
      }
    };

    fetchUserLists();
  }, [session]);

  const handleListClick = (id) => {
    router.push(`/Lists/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <main className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">MIS LISTAS</h1>
          <Button color="black" variant="filled" size="sm" onClick={handleOpen}>Nueva Lista</Button>
          <Dialog
                  size="xs"
                  open={open}
                  handler={handleOpen}
                  className="bg-transparent shadow-none"
          >
          <NewList handleClose={handleOpen}/>
          </Dialog>
        </div>
        <div className="space-y-4">
          {userLists.map((list, index) => (
            <ListCard key={index} {...list} onClick={handleListClick} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ListUI;