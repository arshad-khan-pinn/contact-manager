import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface ContactCardProps {
  contact: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    favourite: boolean;
  };
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e6b0ff',
        padding: 1,
        marginBottom: 1,
        borderRadius: 1,
      }}
    >
      <Avatar sx={{ marginRight: 2 }} />
      <Box>
        <Typography variant="body1">{contact.name}</Typography>
        <Typography variant="body2">{contact.phone}</Typography>
        <Typography variant="body2">{contact.email}</Typography>
      </Box>
      <Box sx={{ marginLeft: 'auto' }}>
        <Typography variant="body2">★</Typography>
      </Box>
    </Box>
  );
};

export default ContactCard;
