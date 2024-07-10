import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option
} from "../MaterialTailwind";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Link from "next/link";


export function AddWord({ word, onClose }) {
  const { data: session } = useSession();
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('/api/lists/get');
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error('Error fetching lists');
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, [session]);

  const handleChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedList(selectedId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedList) {
      alert('Please select a list.');
      return;
    }


    try {
      const response = await fetch('/api/words/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, listId: selectedList }),
      });

      if (response.ok) {
        onClose();
        toast.success("Palabra añadida con éxito");
      } else {
        const data = await response.json();
        toast.error('Error al añadir a la lista: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding word to list:', error);
      toast.error('Error al añadir a la lista: ' + error.message);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Añadir a lista
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <select
              value={selectedList}
              onChange={handleChange}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected>
                Seleccione una lista
              </option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>

            <CardFooter className="mt-4">
              <Button className="mb-4" type="submit" color="black" fullWidth>
                Añadir Palabra
              </Button>
              <Link href="/Lists">
                <Button color="blue" fullWidth>
                  Nueva Lista
                </Button>
              </Link>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddWord;