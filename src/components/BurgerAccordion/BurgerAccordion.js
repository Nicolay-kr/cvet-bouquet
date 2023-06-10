import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import navArrow from '../../../public/assets/icons/navArrow.svg';
import Image from "next/image";
import BlockContentBox from '../BlockcontentBox/BlockContentBox';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

export default function BurgerAccordion({ title, links, parentSlug, onClose }) {
  const [expanded, setExpanded] = React.useState();
  const router = useRouter();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion
      key={title}
      sx={{ background: 'transparent', boxShadow: 'none', p: '0', m: '0' }}
      expanded={expanded === title}
      onChange={handleChange(title)}
    >
      <AccordionSummary
        sx={{ p: '0', minHeight: 'auto', '& div': { m: '0' } }}
        // expandIcon={<Image src={navArrow} alt='belcard icon'></Image>}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Box component='p' sx={{ color: 'white', m: '0', fontSize: '3vh' }}>
          {title}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ '& p+p': { mt: '16px' } }}>
        {links.map((link) => (
          <Box
            key={link.title}
            sx={{
              color: 'white',
              my: '0',
              ml:'10px',
              fontSize: '2.5vh',
              fontWeight: '300',
            }}
            component='p'
            onClick={() => {
              router.push(parentSlug + link.slug.current), onClose();
            }}
          >
            {link.title}
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
