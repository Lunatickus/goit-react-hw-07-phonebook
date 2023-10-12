import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { StyledAppContainer } from './App.styled';

const STORAGE_KEY = 'contacts';

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));

//     if(parsedContacts) {
//       this.setState({contacts: parsedContacts});
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
//     }
//   }

//   handleSubmit = (contact, { resetForm }) => {
//     if (this.state.contacts.some(c => contact.name === c.name)) {
//       alert(`${contact.name} is already in contacts.`);
//       return;
//     }

//     this.setState(prevState => {
//       return {
//         contacts: [...prevState.contacts, { ...contact, id: nanoid() }],
//       };
//     });
//     resetForm();
//   };

//   filterChange = ({ target }) => {
//     this.setState({
//       [target.name]: target.value,
//     });
//   };

//   handleDelete = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const normilizedFilter = filter.toLowerCase();

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normilizedFilter)
//     );

//     return (
//       <StyledAppContainer>
//         <h1>Phonebook</h1>
//         <ContactForm handleSubmit={this.handleSubmit} />

//         <h2>Contacts</h2>
//         <Filter filter={filter} filterChange={this.filterChange} />
//         <ContactList
//           contacts={filteredContacts}
//           handleDelete={this.handleDelete}
//         />
//       </StyledAppContainer>
//     );
//   }
// }

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (contact, { resetForm }) => {
    if (contacts.some(c => contact.name === c.name)) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [...prevState, { ...contact, id: nanoid() }]);
    resetForm();
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normilizedFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normilizedFilter)
  );

  return (
    <StyledAppContainer>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} filterChange={filterChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </StyledAppContainer>
  );
};
