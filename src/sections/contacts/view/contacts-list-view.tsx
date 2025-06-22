import { Button } from "@mui/material";
import ContactList from "../contact-list";
import { useTheme } from "@mui/material";

export default function ContactListView() {
  const theme = useTheme();

  return (
    <>
      <h1 className="text-3xl font-bold">Contact List</h1>
      <ContactList />
      <Button
        href="/contacts/add"
        sx={{
          marginTop: 2,
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: theme.palette.bg.themeToggleButton, 
          "&:hover": { backgroundColor: theme.palette.bg.themeToggleButtonHover },
        }}
        variant="contained"
      >
        Add Contact
      </Button>
    </>
  );
}
