import React from "react";
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import {
    Button,
    
    DialogBody,
    
    DialogFooter,
    
    DialogHeader,
    
    Typography,
} from "../MaterialTailwind";

export function DeleteWord({wordId, handleClose}) {
    const { data: session } = useSession();

    const handleDelete = async () => {
        if (!session) {
            alert('You must be logged in to delete a word.');
            return;
        }

        try {
            const response = await fetch(`/api/words/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: wordId }),
            });

            if (response.ok) {
                toast.success('Palabra eliminada correctamente');
                handleClose();
                setTimeout(()=>{
                    window.location.reload();
                  }, 1000);
            } else {
                const data = await response.json();
                toast.error('Error eliminado la palabra: ' + data.error);
            }
        } catch (error) {
            console.error('Error deleting the word:', error);
            toast.error('Error eliminado la palabra: ' + error.message);
        }
    };


    return (
        <>
            <DialogHeader variant="outlined" color="red" className=" grid h-28 place-items-center">
                <Typography variant="h3" color="black">
                    Eliminar Palabra
                </Typography>
            </DialogHeader>
            <DialogBody className="flex flex-col items-start gap-4">
                <Typography className="text-center" variant="h8" color="black">
                    ¿Estás seguro de que quieres eliminar esta palabra?
                </Typography>
                <Typography className="text-center" variant="h6" color="black">
                    Esta acción es irreversible.
                </Typography>
            </DialogBody>
            <DialogFooter className="mt-4 flex justify-end gap-4">
                <Button variant='text' color="gray" onClick={handleClose}>Cancelar</Button>
                <Button color="red" onClick={handleDelete}>Eliminar</Button>
            </DialogFooter>
        </>
    );
}

export default DeleteWord;