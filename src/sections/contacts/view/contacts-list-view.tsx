import { Button } from "@mui/material";
import ContactList from "../contact-list";
import React, { useState } from 'react';

export default function ContactListView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('test');

  return (
    <>
      <h1>Contact List</h1>
      <ContactList page={page} limit={5} search={search} />
      <Button
        href="/contacts/add"
        sx={{
          marginTop: 2,
          backgroundColor: "#819A91",
          "&:hover": { backgroundColor: "#000000" },
        }}
        variant="contained"
      >
        Add Contact
      </Button>
    </>
  );
}
