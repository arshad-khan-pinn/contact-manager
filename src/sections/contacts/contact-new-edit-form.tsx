import { Box, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import { Contact, useAddContact, useUpdateContact } from '../../store/contactStore';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  number: yup.string().required('Number is required').matches(/^[0-9]+$/, 'Number must contain only digits'),
  email: yup.string().email('Invalid email').nullable().optional(),
  address: yup.string().nullable().optional(),
  favorite: yup.boolean().nullable().optional(),
});

interface FormData {
  name: string;
  number: string;
  email?: string | null;
  address?: string | null;
  favorite?: boolean | null;
}

interface ContactNewEditFormProps {
  contact?: Contact | null;
}

const ContactNewEditForm: React.FC<ContactNewEditFormProps> = ({ contact }) => {
  const navigate = useNavigate();
  const isEdit = !!contact;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
    defaultValues: {
      name: contact?.name || '',
      number: contact?.phone || '',
      email: contact?.email || '',
      address: contact?.address || '',
      favorite: contact?.favourite || false,
    },
  });
  const [isFavorite, setIsFavorite] = useState<boolean>(contact?.favourite || false);
  const { mutate: addContact, status: addStatus } = useAddContact();
  const { mutate: updateContact, status: updateStatus } = useUpdateContact();
  const isLoading = addStatus === 'pending' || updateStatus === 'pending';

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const contactData: Omit<Contact, "id"> = {
        name: data.name,
        phone: data.number,
        email: data.email || '',
        address: data.address || '',
        favourite: data.favorite || false,
      };

      if (isEdit) {
        updateContact({ id: contact.id, ...contactData }, {
          onSuccess: () => {
            console.log("Contact updated successfully!");
            toast.success('Contact updated successfully!');
            navigate('/');
          },
          onError: (error) => {
            console.error("Error updating contact:", error);
            toast.error(`Failed to update contact: ${error.message}`);
          },
        });
      } else {
        addContact(contactData, {
          onSuccess: () => {
            console.log("Contact added successfully!");
            toast.success('Contact added successfully!');
            navigate('/');
          },
          onError: (error) => {
            console.error("Error adding contact:", error);
            toast.error(`Failed to add contact: ${error.message}`);
          },
        });
      }
    } catch (error: unknown) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: (theme) => theme.palette.bg.panel }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: (theme) => theme.palette.font.itemInfo }}>
          {isEdit ? 'Edit Contact' : 'Add New Contact'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: (theme) => theme.palette.bg.textField }}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Number"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: (theme) => theme.palette.bg.textField }}
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2, backgroundColor: (theme) => theme.palette.bg.textField }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            sx={{ mb: 2, backgroundColor: (theme) => theme.palette.bg.textField }}
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend">Mark as Favorite:</Typography>
            <IconButton
              onClick={() => {
                setIsFavorite(!isFavorite);
                setValue('favorite', !isFavorite);
              }}
            >
              {isFavorite ? (
                <Star sx={{ color: '#FFC107' }} />
              ) : (
                <StarBorder />
              )}
            </IconButton>
            <input type="hidden" {...register('favorite')} value={String(isFavorite)} />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontSize: '1rem', backgroundColor: (theme) => theme.palette.bg.searchIconButton }}
            disabled={isLoading}
          >
            {isEdit ? 'Update Contact' : 'Add Contact'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactNewEditForm;
