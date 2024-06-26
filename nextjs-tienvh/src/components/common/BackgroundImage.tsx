import { Box } from '@mui/material';

const BackgroundImage = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("/img/image_1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    />
  );
};

export default BackgroundImage;
