import { Box, Pagination, TextField } from "@mui/material";
import ContactCard from "../../components/contacts/ContactCard";
import {
  Contact,
  useContactStore,
  fetchAllContacts,
} from "../../store/contactStore";
import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const ContactList: React.FC = () => {
  const [search, setSearch] = useState("");
  const limit = 5;
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const showFavoritesOnly = useContactStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useContactStore(
    (state) => state.setShowFavoritesOnly
  );

  useEffect(() => {
    const fetchAll = async () => {
      const all = await fetchAllContacts();
      setAllContacts(all);
    };
    fetchAll();
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const filteredContacts = allContacts.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredContacts.length === 0 ? (
          <div>No contacts found</div>
        ) : (
          filteredContacts
            .filter((contact: Contact) => !showFavoritesOnly || contact.favourite)
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((contact: Contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
        )}
      </Box>
      <Pagination
        count={Math.ceil(filteredContacts.length / limit)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default ContactList;
