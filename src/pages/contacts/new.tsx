import { Helmet } from "@dr.pogodin/react-helmet";
import ContactAddNew from "../../sections/contacts/view/contacts-add-new";

export default function ContactAddPage() {
    return (
        <>
        <Helmet>
          <title>Contact Add</title>
        </Helmet>

        <ContactAddNew />
        </>
    )
}