import { StyledContactListItem, StyledDeleteButton } from './ContactListItem.styled';

export const ContactListItem = ({ contact, handleDelete }) => {
  return (
    <StyledContactListItem>
      {contact.name}: {contact.number}
      <StyledDeleteButton type="button" onClick={handleDelete}>
        Delete
      </StyledDeleteButton>
    </StyledContactListItem>
  );
};
