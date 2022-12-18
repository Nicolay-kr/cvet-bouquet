import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import NavArrow from '../../../public/assets/icons/navArrow.svg';
import Image from 'next/future/image';
import BlockContentBox from '../blockcontentBox/BlockContentBox';


export default function AccordionCustom({ fieldList }) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {fieldList.map((item, index) => {
        const title = item.title.ru ? item.title.ru : item.title;
        const desc = item.desc?.ru ? item.desc.ru : item.desc;
        return (
          <Accordion
            key={index}
            sx={{ background: 'transparent', boxShadow: 'none' }}
            expanded={expanded === title}
            onChange={handleChange(title)}
          >
            <AccordionSummary
              expandIcon={<NavArrow/>}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant="h5" >{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.desc?._type === 'localeBlockContent' ? (
                <BlockContentBox blocks={desc} fs={18}></BlockContentBox>
              ) : (
                <Typography variant="body1">{desc}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
