import { Component } from 'react';
import { Filter } from '../filter/filter';
import { ContactList } from '../contactList/contactList.jsx';
import { ContactForm } from '../contactForm/contactForm.jsx';
import { Container } from './Layout.styled';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  onAddNumber = newNumber => {
    const isIcluded = this.state.contacts.some(item => {
      return (
        item.name.toLocaleLowerCase() === newNumber.name.toLocaleLowerCase()
      );
    });
    if (isIcluded) {
      alert(`${newNumber.name} is alredy in contacts`);
      return;
    }
    this.setState(prevSetstate => {
      return {
        contacts: [...prevSetstate.contacts, newNumber],
      };
    });
  };
  onDelete = targetId => {
    this.setState(prevSetstate => {
      return {
        contacts: prevSetstate.contacts.filter(item => {
          return item.id !== targetId;
        }),
      };
    });
  };
  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };
  getFiltredMassive = () => {
    return this.state.contacts.filter(item => {
      const normalize = item.name.toLowerCase();
      const normalizeTarget = this.state.filter.toLowerCase();
      return normalize.includes(normalizeTarget);
    });
  };
  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddNumber={this.onAddNumber} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <ContactList
          contacts={this.getFiltredMassive()}
          onDelete={this.onDelete}
        />
      </Container>
    );
  }
}
