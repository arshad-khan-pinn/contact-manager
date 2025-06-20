import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Modal,
  IconButton,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import ContactEditModal from "../../sections/contacts/view/contacts-edit-modal";
import { useUpdateContact } from "../../store/contactStore";

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

  const handleClose = () => setOpen(false);

  const { mutate: updateContact } = useUpdateContact();

  const handleUpdateFavorite = (id: number, favorite: boolean) => {
    updateContact({
      id,
      favourite: favorite,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    });
  };

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#e6b0ff",
          padding: 1,
          marginBottom: 1,
          borderRadius: 1,
          cursor: "pointer",
        }}
      >
        <Avatar sx={{ marginRight: 2 }} />
        <Box sx={{ minWidth: 250 }}>
          <Typography variant="body1">{contact.name}</Typography>
          <Typography variant="body2">{contact.phone}</Typography>
          <Typography variant="body2">{contact.email}</Typography>
        </Box>
        <Box sx={{ minWidth: 100, mb: 2}}>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleUpdateFavorite(contact.id, !contact.favourite);
            }}
          >
            {contact.favourite ? <Star sx={{ color: "#FFC107", fontSize: 30 }} /> : <StarBorder sx={{ fontSize: 30 }} />}
          </IconButton>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <ContactEditModal contact={contact} onClose={handleClose} />
      </Modal>
    </>
  );
};

export default ContactCard;
