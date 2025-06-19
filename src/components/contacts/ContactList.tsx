import React, { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { useContactStore } from '../../store/contactStore';
import ContactCard from './ContactCard';

const ContactList = () => {
  const [page, setPage] = useState(1);
  const contactsPerPage = 5;
  const { contacts, fetchContacts } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const totalContacts = contacts.length;

  const paginatedContacts = contacts.slice(
    (page - 1) * contactsPerPage,
    page * contactsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {paginatedContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <Pagination
        count={Math.ceil(totalContacts / contactsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default ContactList;
