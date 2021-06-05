import shortid from "shortid";
import { connect } from 'react-redux';


import { ToastContainer, toast } from "react-toastify";
import Filter from "./Components/Filter";
import ContactList from "./Components/ContactList";
import Form from "./Components/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
//import contactsActions from "./redux/phonebook-action";
import * as contactsOperations from './redux/phonebook-operations';
import { getIsLoading } from './redux/phonebook-selector';
import { deleteContact } from './redux/phonebook-selector';
class App extends Component {


  componentDidMount() {
    //const contacts = localStorage.getItem("contacts");
    //const contactsParse = JSON.parse(contacts);
    //if (contactsParse) {
    //  this.setState({ contacts: contactsParse });
    this.props.onGetCurrentUser()
  }
  

  //componentDidUpdate(prevState) {
  //  const { contacts } = this.state;
  //  if (contacts !== prevState.contacts) {
  //    localStorage.setItem("contacts", JSON.stringify(contacts));
  //  }
  //}

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (name === "") {
      toast(`Пожалуйста введите имя`);
      return;
    }
    if (number === "") {
      toast(`Пожалуйста введите номер контакта`);
      return;
    }
    if (contacts.find((contact) => contact.name === name)) {
      toast(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: shortid.generate(), name, number };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };
  getContacts = () => {
    const { filter, contacts } = this.state;
    const normFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  render() {
    //const { filter } = this.state;
    const visibleContacts = this.getContacts();

    return (
      <>
      
        <h1>Phonebook</h1>
        <Form/>
        <h2>Contacts</h2>
        <Filter />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
        {this.props.isLoadingContacts && <h2> Loading contacts...</h2>}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContacts: getIsLoading(state),
  //value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
  onDelete: contactId => dispatch(contactsOperations.deleteContact(contactId)),
  //  dispatch(contactsActions.addContact({ name, number })),

  //onChange: (event) =>
  // dispatch(contactsActions.changeFilter(event.target.value)),

//onDeleteContact: (contactId) => dispatch(contactsActions.deleteContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
