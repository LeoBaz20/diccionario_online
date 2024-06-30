import React from 'react';
import { Card, CardBody, Typography} from '../MaterialTailwind';

const LDCard = ({name, wordCount}) => {

  return (
    <Card className="bg-blue-500 text-white relative mb-4">
      <CardBody>
        <Typography variant="h4" color="white" className="mb-8">
          {name}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default LDCard;