import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import navArrow from '../../../public/assets/icons/navArrow.svg';
import Image from 'next/future/image';

export default function AccordionCustom({ fieldList }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {fieldList.map((item, index) => (
        <Accordion
          key={index}
          sx={{ background: 'transparent',boxShadow:'none' }}
          expanded={expanded === item.title}
          onChange={handleChange(item.title)}
        >
          <AccordionSummary
            expandIcon={<Image src={navArrow} alt='belcard icon'></Image>}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.desc}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
