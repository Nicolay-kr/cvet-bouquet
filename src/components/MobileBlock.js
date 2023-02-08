import Box from '@mui/material/Box';


const MobileBlock = ({children}) =>{

  return(
    <Box sx ={{display:{xs:'block',lg:'none'}}}>
      {children}

    </Box>
  )
}

export default MobileBlock;