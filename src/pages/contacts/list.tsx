import { Helmet } from "@dr.pogodin/react-helmet";
import ContactListView from "../../sections/contacts/ContactListView";

export default function ContactListPage() {
    return (
      <>
        <Helmet>
          <title>Contacts List</title>
        </Helmet>
  
        <ContactListView />
      </>
    );
  }