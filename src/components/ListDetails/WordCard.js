import React from 'react';
import { Card, CardBody, Dialog, IconButton, Typography } from '../MaterialTailwind';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/solid';
import DeleteWord from './DeleteWord';

const WordCard = ({ wordObj }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <Card color="transparent" shadow={false}>
      <CardBody>
        <Link href={`/search/${wordObj.word}`}>
          <Typography color="indigo" variant="h4">
            {wordObj.word}
          </Typography>
        </Link>
      </CardBody>
      <div className="absolute bottom-5 right-2">
        <IconButton onClick={handleOpen} variant='text' className='rounded-full' >
          <TrashIcon color='red' className="h-4 w-4"></TrashIcon>
        </IconButton>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-white shadow-none"
        >
        <DeleteWord wordId={wordObj.id} handleClose={handleOpen}/>
        </Dialog>
      </div>
      <hr className="my-3 border-t-2 border-gray" />
    </Card>
  );
};

export default WordCard;
2