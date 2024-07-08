import React from "react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "../MaterialTailwind";
 
export function NewList({handleClose}) {
  const [name, setName] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert('You must be logged in to create a list.');
      return;
    }

    const response = await fetch('/api/lists/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success('Lista creada correctamente');
      setName('');
      handleClose();
      setTimeout(()=>{
        window.location.reload();
      }, 2000);
    } else {
      toast.error('Error creando la lista: ' + data.error);
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
            Crear nueva lista
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
                Crear Lista
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default NewList;