import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContactStore, useDeleteContact } from '../../../store/contactStore';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface ContactEditModalProps {
  contact: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    favourite: boolean;
  };
  onClose: () => void;
}

export default function ContactEditModal({ contact, onClose }: ContactEditModalProps) {
  const navigate = useNavigate();
  const { mutate: deleteContact } = useDeleteContact();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const queryClient = useQueryClient();

  const handleEdit = () => {
    useContactStore.getState().setSelectedContact(contact); // set contact in store
    navigate(`/contacts/edit/${contact.id}`);
  };

  const handleDelete = () => {
    setOpenConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    deleteContact(contact.id, {
      onSuccess: () => {
        console.log("Contact deleted successfully!");
        toast.success('Contact deleted successfully!');
        navigate('/');
        onClose();
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      },
      onError: (error) => {
        console.error("Error deleting contact:", error);
        toast.error(`Failed to delete contact: ${error.message}`);
      },
    });
    setOpenConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationModal(false);
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {contact.name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Email: {contact.email}
        <br />
        Phone: {contact.phone}
        <br />
        Address: {contact.address}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button sx={{ mr: 1 }} variant="outlined" onClick={handleEdit}>Edit</Button>
        <Button sx={{ mr: 1 }} variant="outlined" onClick={handleDelete}>Delete</Button>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </Box>
      <ConfirmationModal
        open={openConfirmationModal}
        title="Delete Contact"
        content="Are you sure you want to delete this contact?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
