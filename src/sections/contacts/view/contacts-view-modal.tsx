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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { green, red } from "@mui/material/colors";
import { getInitials } from "../../../utils/getInitials";

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
      onError: (error: Error | { message: string }) => {
        console.error("Error deleting contact:", error);
        toast.error(`Failed to delete contact: ${error?.message || 'Failed to delete contact'}`);
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
        width: 450,
        height: 350,
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
        <Avatar sx={{ borderRadius: 3, boxShadow: 3, width: 50, height: 50, color: theme.palette.font.info }}>{getInitials(contact.name)}</Avatar>
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
        <Button variant="outlined"  sx={{ color: green[500], borderColor: green[500], "&:hover": { backgroundColor: green[700], color: "white" } }}   onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }}/>
          Edit
        </Button>
        <Button variant="outlined" sx={{ color: red[500], borderColor: red[500], "&:hover": { backgroundColor: red[700], color: "white" } }} onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }}/>
          Delete
        </Button>
        <Button onClick={onClose} sx={{ color: theme.palette.font.info, borderColor: theme.palette.font.info, "&:hover": { backgroundColor: theme.palette.font.info, color: "black" } }} variant="outlined">
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
