import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import size from '../utils/size';
import { useRouter } from 'next/router';

export default function PriceFilter({ value, changeFunc }) {
  const router = useRouter();
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
          display: {
            xs: 'flex',
            sm: 'flex',
          },
          '& p': {
            fontSize: { xs: '12px',sm:'14',md:'15px',xl:'20px',xxl:'1.04vw' },
          },
        }}
      >
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'0-150'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ ml: 'auto' }}
                variant='h5'
                component='p'
                color='#000000'
              >
                до 150
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'151-300'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ ml: 'auto' }}
                variant='h5'
                component='p'
                color='#000000'
              >
                150
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
              <Typography
                sx={{ ml: 'auto' }}
                variant='h5'
                component='p'
                color='#000000'
              >
                {' '}
                - 300
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'301-500'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant='h5'
                sx={{ ml: 'auto' }}
                component='p'
                color='#000000'
              >
                300
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
              <Typography
                variant='h5'
                sx={{ ml: 'auto' }}
                component='p'
                color='#000000'
              >
                {' '}
                - 500
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'501-1000'}
          control={<Radio />}
          label={
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant='h5'
                sx={{ ml: 'auto' }}
                component='p'
                color='#000000'
              >
                500
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
              <Typography
                variant='h5'
                sx={{ ml: 'auto' }}
                component='p'
                color='#000000'
              >
                {' '}
                - 1000
                <Box sx={{ fontSize: '0.5em', pt: '4px' }} component='sup'>
                  BYN
                </Box>
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'1001-10000'}
          control={<Radio />}
          label={
            <Typography variant='h5' component='p'>
              Премиум
            </Typography>
          }
        />
        <FormControlLabel
          sx={{ mr: size(16) }}
          value={'all'}
          control={<Radio />}
          label={
            <Typography variant='h5' component='p'>
              Все
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
