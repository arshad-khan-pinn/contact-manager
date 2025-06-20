import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Modal } from '@mui/material';
import ContactEditModal from '../../sections/contacts/view/contacts-edit-modal';

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
        <Button onClick={handleOpen}>Details</Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ContactEditModal contact={contact} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default ContactCard;
