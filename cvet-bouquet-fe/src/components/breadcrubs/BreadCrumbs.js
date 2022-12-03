import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import breadCrumbArrow from '../../../public/assets/icons/breadCrumbArrow.svg';
import Image from 'next/future/image';
import Link from 'next/link';

export default function BreadCrumbs({ breadCrumbsList, isInIntro = false }) {
  const breadcrumbs = breadCrumbsList.map((breadcrumb, index) => {
    if (breadcrumb.href) {
      return (
        <Link
          underline='hover'
          key={index}
          color='inherit'
          href={breadcrumb.href}
        >
          {breadcrumb.title}
        </Link>
      );
    } else {
      return (
        <Typography key={index} color='text.primary'>
          {breadcrumb.title}
        </Typography>
      );
    }
  });

  return (
    <Box
      sx={{
        px: { xs: '5%', lg: '10%' },
        pl: { xs: isInIntro ? '0' : '5%', lg: isInIntro ? '0' : '10%' },
        py: { xs: '24px', lg: '24px' },
      }}
    >
      <Breadcrumbs
        separator={<Image src={breadCrumbArrow} alt='arrow icon'></Image>}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
