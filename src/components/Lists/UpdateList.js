import React, { useEffect } from "react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "../MaterialTailwind";
 
export function UpdateList({listId, listName,handleClose}) {
  const [name, setName] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    setName(listName);
  }, [listName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert('You must be logged in to update a list.');
      return;
    }

    const response = await fetch(`/api/lists/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: listId, name }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success('Lista actualizada correctamente');
      handleClose();
      setTimeout(()=>{
        window.location.reload();
      }, 2000);
    } else {
      toast.error('Error actualizando la lista: ' + data.error);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader
          variant="outlined"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Editar lista
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <Typography className="mb-2" variant="h6" color="black">
              Nombre de la lista
            </Typography>
            <Input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              containerProps={{
                className: "w-full",
              }}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <CardFooter className="mt-4">
              <Button type="submit" color="black" fullWidth>
                Guardar Cambios
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default UpdateList;