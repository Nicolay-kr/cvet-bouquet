import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import SearchIcon from '../../public/assets/icons/search.svg';
import Whitesearch from '../../public/assets/icons/whitesearch.svg';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Whitecros from '../../public/assets/icons/whitecros.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { sanityClient, urlFor } from '../../sanity';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// export default function SearchModal({bouquets}) {
export default function SearchModal({}) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [sortedList, setSortedList] = React.useState([]);
  const [bouquets, setBouquets] = useState([]);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSortedList([]);
    setSearchValue('');
  };
  const fetchCategories = useCallback(async () => {
    sanityClient
      .fetch(
        `*[ _type == "bouquet"]
        {
          _id,
          title,
          slug,
          images,
          price,
          description,
        }`
      )
      .then((data) => setBouquets(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const search = (str, searchArr) => {
    const arr = [];
    searchArr.forEach((element) => {
      if (str?.includes(element.toLowerCase())) {
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
      search(item.title?.ru?.toLowerCase(), searchStrArr)
    );
    return sortArr;
  };

  const handleSearchChange = (e) => {
    let sotedList = filterArr(e.target.value, bouquets);
    setSearchValue(e.target.value);
    setSortedList([...sotedList]);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} sx={{ px: { xs: '4px', sm: '8px'}}} aria-label="SearchIcon">
        <Box sx={{width:{ xs: 22, sm: 24, lg: 26 } }} viewBox="0 0 26 26"component={SearchIcon}></Box>

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
                  autoFocus={true}
                  id='search'
                  value={searchValue}
                  onChange={handleSearchChange}
                  sx={{
                    width: { xs: '200px', lg: '300px' },
                    borderRadius: '8px 0 0 8px',
                    '&>div': { height: '100%', borderRadius: '4px 0 0 4px' },
                  }}
                />
                <Button
                  sx={{ borderRadius: '0 8px 8px 0' }}
                  variant='contained'
                  color='primary'
                >
                  <Whitesearch/>
                </Button>
              </Box>
              <IconButton
                sx={{
                  mr: 'auto',
                }}
                component='p'
                role='presentation'
                onClick={handleClose}
                aria-label="CrossIcon"
              >
            <Whitecros/>
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
                    gridTemplateColumns: { xs: '1fr 1fr', lg: '1fr 1fr 1fr' },
                    columnGap: { xs: '20px', lg: '30px' },
                    rowGap: { xs: '20px', lg: '30px' },
                    width: '100%',
                    overflowY:'scroll',
                    height:{xs:'77vh',lg:'30vh'}
                    
                  }}
                >
                  {sortedList.map((bouquet, index) => (
                    <Box
                      key={`${bouquet.id}-${index}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: '20px',
                        '& img': { objectFit: 'cover' },
                      }}
                    >
                      <Box onClick={handleClose}>
                      <Image
                      onClick={() => router.replace(`/catalog/allbouquets/${bouquet.slug.current}`)}
                        
                        layout='fill'
                        width={100}
                        height={125}
                        src={urlFor(bouquet?.images[0])?.width(400)?.url()}
                        alt='bouquet'
                        style={{cursor:'pointer'}}
                      ></Image>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1'>
                          {bouquet?.title?.ru}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='h4'
                          component='p'
                          sx={{ fontWeight: 700, display: 'flex', mb: '0' }}
                        >
                          {bouquet?.price}{' '}
                          <sup style={{ fontSize: '10px', paddingTop: '4px' }}>
                            BYN
                          </sup>
                        </Typography>
                      </Box>
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
