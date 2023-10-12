import { ContactListItem } from "components/ContactListItem/ContactListItem";

export const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <ContactListItem
            contact={contact}
            handleDelete={() => handleDelete(contact.id)}
            key={contact.id}
          />
        );
      })}
    </ul>
  );
};
