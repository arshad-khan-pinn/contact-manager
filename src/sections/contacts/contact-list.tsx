import { Box, Pagination, TextField } from '@mui/material';
import ContactCard from '../../components/contacts/ContactCard';
import { useContacts, Contact } from '../../store/contactStore';
import React, { useState } from 'react';

const ContactList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useContacts(currentPage, 5, search);

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  if (isError) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  const contacts = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };


  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      {contacts.map((contact: Contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default ContactList;
