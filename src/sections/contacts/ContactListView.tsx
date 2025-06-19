import { Button } from "@mui/material";
import ContactList from "../../components/contacts/ContactList";

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText("#819A91"),
//   backgroundColor: "#819A91",
//   '&:hover': {
//     backgroundColor: "#000000",
//   },
// }));

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
