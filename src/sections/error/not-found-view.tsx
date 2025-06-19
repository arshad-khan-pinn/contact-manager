import { Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundView() {
  return (
    <Container sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sorry, we couldn’t find the page you’re looking for. It might have been removed, renamed, or does not exist.
      </Typography>

      <Button
        variant="contained"
        size="large"
        component={RouterLink}
        to="/"
      >
        Go to Home
      </Button>
    </Container>
  );
}
