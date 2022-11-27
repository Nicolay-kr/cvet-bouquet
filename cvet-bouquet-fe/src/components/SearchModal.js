import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import searchIcon from '../../public/assets/icons/search.svg';
import whitesearch from '../../public/assets/icons/whitesearch.svg';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import whitecros from '../../public/assets/icons/whitecros.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { urlFor } from '../../sanity';


// export default function SearchModal({bouquets}) {
export default function SearchModal({ bouquets }) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [sortedList, setSortedList] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSortedList([]);
    setSearchValue('')
  };

  const search = (str, searchArr) => {
    const arr = [];
    searchArr.forEach((element) => {
      if (str.includes(element.toLowerCase())) {
        arr.push(element);
      }
    });
    return searchArr.length === arr.length;
  };

  const filterArr = (str, arr) => {
    if (str.length === 0) {
      return [];
    }
    const searchStrArr = str.split(' ');
    const sortArr = arr.filter((item) =>
      search(item.title.ru.toLowerCase(), searchStrArr)
    );
    return sortArr;
  };

  const handleSearchChange = (e) => {
    let sotedList = filterArr(e.target.value, bouquets);
    setSearchValue(e.target.value);
    setSortedList([...sotedList]);
  };
  console.log(sortedList);

  return (
    <div>
      <IconButton onClick={handleOpen} sx={{ px: { xs: '4px', sm: '8px' } }}>
        <Image src={searchIcon} alt='search icon'></Image>
      </IconButton>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box>
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: '7.5%',
                right: '5%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: 'white',
                  mr: 'max(20px, 1.2vw)',
                  borderRadius: '8px',
                  height: '42px',
                }}
              >
                <TextField
                  id='search'
                  value={searchValue}
                  onChange={handleSearchChange}
                  sx={{
                    width: {xs:'200px',lg:'300px'},
                    borderRadius: '8px 0 0 8px',
                    '&>div': { height: '100%', borderRadius: '4px 0 0 4px' },
                  }}
                />
                <Button
                  sx={{ borderRadius: '0 8px 8px 0' }}
                  variant='contained'
                  color='primary'
                >
                  <Box
                    component={Image}
                    sx={{ width: '24px', height: '24px' }}
                    src={whitesearch}
                    alt='search icon'
                  ></Box>
                </Button>
              </Box>
              <IconButton
                sx={{
                  mr: 'auto',
                }}
                component='p'
                role='presentation'
                onClick={handleClose}
              >
                <Box
                  component={Image}
                  sx={{ width: '24px', height: '24px' }}
                  src={whitecros}
                  alt='cros icon'
                ></Box>
              </IconButton>
            </Box>
            {sortedList.length > 0 ? (
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  px: { xs: '5%', lg: '10%' },
                  py: { xs: '20px', lg: '50px' },
                  minHeight: '30%',
                  top: '20%',
                  backgroundColor: 'fon.main',
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs:'1fr 1fr',lg:'1fr 1fr 1fr'},
                    columnGap:{xs:'20px',lg:'30px'},
                    rowGap:{xs:'20px',lg:'30px'},
                    width: '100%',
                  }}
                >
                  {sortedList.map((bouquet) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: {xs:'column',lg:'row'},
                        gap: '20px',
                        '& img': { objectFit: 'cover' },
                      }}
                    >
                      {/* <Link href={`cart/${slug.current}`}> */}
                      <Image
                          layout='fill'
                          width={100}
                          height={125}
                          src={urlFor(bouquet?.images[0])?.width(500).url()}
                          alt='bouquet'
                        ></Image>
                      {/* </Link> */}

                      <Typography variant='body1'>
                        {bouquet?.title?.ru}
                      </Typography>
                    </Box>
                    
                  ))}
                </Box>
              </Box>
            ) : null}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
