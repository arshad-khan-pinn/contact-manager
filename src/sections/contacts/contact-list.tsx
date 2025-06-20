import { Box, Pagination } from '@mui/material';
import ContactCard from '../../components/contacts/ContactCard';
import { useContacts, Contact } from '../../store/contactStore';

const ContactList = () => {
  const page = 1; // set default page to 1
  const limit = 5; // contacts per page
  const search = 'test'; // default search term

  const { data, isLoading, isError, error } = useContacts(page, limit, search);

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  if (isError) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  const contacts = data || [];
  const totalContacts = contacts.length;

  // const paginatedContacts = contacts.slice(
  //   (page - 1) * contactsPerPage,
  //   page * contactsPerPage
  // );

  // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  return (
    <Box sx={{ padding: 2 }}>
      {contacts.map((contact: Contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <Pagination
        count={Math.ceil(totalContacts / limit)}
        page={page}
        // onChange={handlePageChange}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default ContactList;
