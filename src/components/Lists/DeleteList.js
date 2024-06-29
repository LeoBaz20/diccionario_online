import React from "react";
import { toast } from 'react-toastify';
import {
    Button,
    
    DialogBody,
    
    DialogFooter,
    
    DialogHeader,
    
    Typography,
} from "../MaterialTailwind";

export function DeleteList({ listId, handleClose }) {

    const handleDelete = async () => {

        try {
            const response = await fetch(`/api/lists/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: listId }),
            });

            if (response.ok) {
                toast.success('Lista eliminada correctamente');
                handleClose();
                setTimeout(()=>{
                    window.location.reload();
                  }, 2000);
            } else {
                const data = await response.json();
                toast.error('Error eliminado la lista: ' + data.error);
            }
        } catch (error) {
            console.error('Error deleting list:', error);
            toast.error('Error eliminado la lista: ' + error.message);
        }
    };

    return (
        <>
            <DialogHeader variant="outlined" color="red" className=" grid h-28 place-items-center">
                <Typography variant="h3" color="black">
                    Eliminar Lista
                </Typography>
            </DialogHeader>
            <DialogBody className="flex flex-col items-start gap-4">
                <Typography className="text-center" variant="h8" color="black">
                    ¿Estás seguro de que quieres eliminar esta lista?
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

export default DeleteList;