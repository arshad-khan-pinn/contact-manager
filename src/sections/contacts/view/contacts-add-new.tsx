import { setStorage } from "../../../hooks/userLocalStorage";
import ContactNewEditForm from "../contact-new-edit-form";

export default function ContactAddNew() {
    setStorage('contact', null)
    return (
        <>
            <h1>Contact Add New</h1>

            <ContactNewEditForm />
        </>
    )
}