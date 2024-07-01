import { useState, React } from "react";
import { ArrowsRightLeftIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionHeader, AccordionBody } from "../MaterialTailwind";


export function TranslateFavs() {

    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className="w-full max-w-7xl p-5 bg-white border border-gray-200 rounded-lg shadow-md">
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    Traducciones Guardadas
                </AccordionHeader>
                <AccordionBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et nunc ac mi laoreet mollis non et leo. Donec dignissim, dui sit amet gravida sodales, turpis erat fermentum erat, in lacinia purus nunc eget lectus.
                </AccordionBody>
                <AccordionBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et nunc ac mi laoreet mollis non et leo. Donec dignissim, dui sit amet gravida sodales, turpis erat fermentum erat, in lacinia purus nunc eget lectus.
                </AccordionBody>
                <AccordionBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et nunc ac mi laoreet mollis non et leo. Donec dignissim, dui sit amet gravida sodales, turpis erat fermentum erat, in lacinia purus nunc eget lectus.
                </AccordionBody>
            </Accordion>
        </div>
    );
};

export default TranslateFavs;
