import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PriceFilter({ value, changeFunc }) {
  const handleChange = (event) => {
    changeFunc(event.target.value);
  };
  return (
    <FormControl sx={{ width: '100%', px: { xs: '5%', lg: '10%' }, mb: 3 }}>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={value}
        onChange={handleChange}
        sx={{
          display: { xs: 'grid', sm: 'flex' },
          gridTemplateColumns: { xs: '1fr 1fr' },
        }}
      >
        <FormControlLabel
          value={'100,300'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontSize: { xs: '14px', lg: '24px' }, ml: 'auto' }}
                variant='h4'
                component='p'
                color='#000000'
              >
                100
                <Box sx={{ fontSize: '10px', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '14px', lg: '24px' }, ml: 'auto' }}
                variant='h4'
                component='p'
                color='#000000'
              >
                {' '}
                - 300
                <Box sx={{ fontSize: '10px', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value={'301,500'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ fontSize: { xs: '14px', lg: '24px' }, ml: 'auto' }}
                component='p'
                color='#000000'
              >
                300
                <Box sx={{ fontSize: '10px', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '14px', lg: '24px' }, ml: 'auto' }}
                component='p'
                color='#000000'
              >
                {' '}
                - 500
                <Box sx={{ fontSize: '10px', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value={'501,4000'}
          control={<Radio />}
          label={
            <Typography
              sx={{ fontSize: { xs: '14px', lg: '24px' } }}
              component='p'
            >
              Премиум
            </Typography>
          }
        />
        <FormControlLabel
          value={'Все'}
          control={<Radio />}
          label={
            <Typography
              sx={{ fontSize: { xs: '14px', lg: '24px' } }}
              component='p'
            >
              Все
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
