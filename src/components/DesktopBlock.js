import Box from '@mui/material/Box';


const DesktopBlock = ({children}) =>{

  return(
    <Box sx ={{display:{xs:'none',lg:'block'}}}>
      {children}
    </Box>
  )
}

export default DesktopBlock;