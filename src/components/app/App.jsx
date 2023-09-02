import { Component } from 'react';

import { ContactList } from '../contactList/contactList.jsx';
import { ContactForm } from '../contactForm/contactForm.jsx';
import { Container } from './Layout.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const storage = localStorage.getItem('contacts');
    this.setState({ contacts: JSON.parse(storage) ?? [] });
  }
  componentDidUpdate(prevState, nextState) {
    if (nextState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
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
  // onFilter = e => {
  //   this.setState({
  //     filter: e.target.value,
  //   });
  // };
  // getFiltredMassive = () => {
  //   return this.state.contacts.filter(item => {
  //     const normalize = item.name.toLowerCase();
  //     const normalizeTarget = this.state.filter.toLowerCase();
  //     return normalize.includes(normalizeTarget);
  //   });
  // };
  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddNumber={this.onAddNumber} />
        <h2>Contacts</h2>
        {this.state.length > 0 && (
          <ContactList
            contacts={this.state.contacts}
            onDelete={this.onDelete}
          />
        )}
      </Container>
    );
  }
}
