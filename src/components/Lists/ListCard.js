import React from 'react';
import { Card, CardBody, Typography, IconButton, Menu, MenuHandler, MenuList, MenuItem, Dialog } from '../MaterialTailwind';
import { EllipsisVerticalIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { UpdateList } from './UpdateList';
import { DeleteList } from './DeleteList';

const ListCard = ({ id, name, wordCount, onClick }) => {
  const [dialogType, setDialogType] = React.useState(null);

  const handleOpen = (type) => {
    setDialogType((current) => (current === type ? null : type));
  };



  return (
    <Card  className="bg-blue-500 text-white relative mb-4">
      <CardBody onClick={() => onClick(id)}>
        <Typography variant="h5" color="white" className="mb-8">
          {name}
        </Typography>
        <Typography className="bottom-2">
          {wordCount} {wordCount === 1 ? 'palabra registrada' : 'palabras registradas'}
        </Typography>
      </CardBody>
      <div className="absolute bottom-2 right-2">
        <Menu>
          <MenuHandler>
            <IconButton color="white" variant="text">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2" onClick={() => handleOpen('edit')}>
              <PencilIcon className="h-3 w-3" />
              <Typography variant="small" className="font-medium">Editar Lista</Typography>
            </MenuItem>
            <hr className="my-1" />
            <MenuItem className="flex items-center gap-2" onClick={() => handleOpen('delete')}>
              <TrashIcon className="h-3 w-3" color="red" />
              <Typography variant="small" className="font-medium" color="red">Eliminar Lista</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <Dialog
        size="xs"
        open={dialogType === 'edit'}
        handler={() => handleOpen('edit')}
        className="bg-transparent shadow-none"
      >
        <UpdateList listId={id} listName={name} handleClose={() => handleOpen('edit')}/>
      </Dialog>

      <Dialog
        size="xs"
        open={dialogType === 'delete'}
        handler={() => handleOpen('delete')}
        className="bg-white shadow-none"
      >
        <DeleteList listId={id} handleClose={() => handleOpen('delete')}/>
      </Dialog>
    </Card>
  );
};

export default ListCard;