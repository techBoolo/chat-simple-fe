import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer = (props) => {

  return (
    <Box sx={{ 
      display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '0.5rem',
        borderTop: '1px solid #ccc',
        marginTop: '0.5rem',
        py: '0.5rem',
        backgroundColor: '#ff9e9e85'
      }}
    >
      <Typography variant='text1'>&copy;</Typography>
    </Box>
  );
};

export default Footer
