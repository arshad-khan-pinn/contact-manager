import { Box, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContactStore, useDeleteContact } from "../../../store/contactStore";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ContactViewModalProps {
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

export default function ContactViewModal({
  contact,
  onClose,
}: ContactViewModalProps) {
  const navigate = useNavigate();
  const { mutate: deleteContact } = useDeleteContact();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const queryClient = useQueryClient();
  const theme = useTheme();

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
        toast.success("Contact deleted successfully!");
        navigate("/");
        onClose();
        queryClient.invalidateQueries({ queryKey: ["contacts"] });
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
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        bgcolor: theme.palette.bg.item,
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ borderRadius: 6, boxShadow: 5, width: 60, height: 60 }} />
        <Typography variant="h4" fontWeight="bold" component="h2">
          {contact.name}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start", px: 2, gap: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon sx={{ color: theme.palette.font.info, fontSize: 25 }} />
          <Typography variant="body1">{contact.email}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PhoneIcon sx={{ color: theme.palette.font.info, fontSize: 25 }} />
          <Typography variant="body1">{contact.phone}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LocationOnIcon sx={{ color: theme.palette.font.info, fontSize: 25 }} />
          <Typography variant="body1">{contact.address}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
        <Button variant="outlined" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
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
