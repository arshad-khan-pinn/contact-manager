import { Box, TextField, Button, Switch, FormControlLabel, Typography, Paper } from '@mui/material';
import { Contact, useAddContact, useUpdateContact } from '../../store/contactStore';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
    defaultValues: {
      name: contact?.name || '',
      number: contact?.phone || '',
      email: contact?.email || '',
      address: contact?.address || '',
      favorite: contact?.favourite || false,
    },
  });
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
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {isEdit ? 'Edit Contact' : 'Add New Contact'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Number"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            {...register('number')}
            error={!!errors.number}
            helperText={errors.number?.message}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <Box sx={{ mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              // onChange={handleImageChange} // Removed handleImageChange
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" sx={{ mb: 1 }}>
                Upload Image
              </Button>
            </label>
          </Box>
          <FormControlLabel
            control={<Switch {...register('favorite', { value: false })} />}
            label="Mark as Favorite"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontSize: '1rem' }}
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
