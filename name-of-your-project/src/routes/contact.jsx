import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts.js";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const contact = useLoaderData();
  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>
    </div>
  );
}
