import React from 'react';
import Box from '@mui/material/Box';
import BlockContent from '@sanity/block-content-to-react';
import size from '../../utils/size';

export default function BlockContentBox({ blocks,fs=20 }) {
  return (
    <Box
    className='blockContentt'
      sx={{
        color:'#000000',
        '& p': {
          fontFamily: 'Raleway, serif',
          color:'#000000',
          fontSize: {...size(fs),xs:16},
        },
        my: 'auto',
        '& li+li': {
          mt: '16px',
          fontSize: {...size(fs),xs:16},
        },
        '& li': {
          fontSize: {...size(fs),xs:16},
        },
      }}
    >
      <BlockContent blocks={blocks} projectId={process.env.SANITY_PROJECT_ID}
  dataset={process.env.SANITY_DATASET}></BlockContent>
    </Box>
  );
}
