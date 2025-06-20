import { Button } from "@mui/material";
import ContactList from "../contact-list";
import { useState } from 'react';

export default function ContactListView() {

  return (
    <>
      <h1>Contact List</h1>
      <ContactList />
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
