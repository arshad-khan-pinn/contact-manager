import { Helmet } from "@dr.pogodin/react-helmet";
import ContactNewEditForm from "../../sections/contacts/contact-new-edit-form";
import { useContactStore } from '../../store/contactStore';

export default function ContactEditPage() {
  const contact = useContactStore((state) => state.selectedContact);

  if (!contact) {
    return (
      <>
        <Helmet>
          <title>Contact Edit</title>
        </Helmet>
        <div>No Contact Found</div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Edit</title>
      </Helmet>

      {contact && <ContactNewEditForm contact={contact} />}
    </>
  );
}
