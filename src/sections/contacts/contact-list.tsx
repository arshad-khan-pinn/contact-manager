import { Box, Pagination, TextField } from "@mui/material";
import ContactCard from "../../components/contacts/ContactCard";
import {
  useContacts,
  Contact,
  useContactStore,
} from "../../store/contactStore";
import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const ContactList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const showFavoritesOnly = useContactStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useContactStore(
    (state) => state.setShowFavoritesOnly
  );

  const { data, isLoading, isError, error } = useContacts({
    page: currentPage,
    limit,
  });

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  if (isError) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  const contacts = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              color="primary"
            />
          }
          label="Show Favorites"
          sx={{
            marginBottom: 2,
            marginLeft: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: (theme) => theme.palette.bg.item,
          borderRadius: 4,
          paddingX: 2,
          paddingY: 2,
          border: "1px solid #333333",
        }}
      >
        {contacts
          .filter((contact: Contact) => !showFavoritesOnly || contact.favourite)
          .map((contact: Contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default ContactList;
