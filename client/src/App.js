import { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: null };
    }

    getContacts = () => {
        fetch("http://localhost:5000/api/contacts")
        .then(res => res.json())
        .then(res => this.setState({ contacts: Array.from(res) }))
        .catch(err => console.log(err));
    }

    addContact = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: e.target.name.value,
                phone: parseInt(e.target.phone.value),
            })
        })
        .then(() => this.getContacts())
        .catch(err => console.log(err));
    }

    updateContact = (e) => {
        e.preventDefault();

        let updatedObject = {}
        if (e.target.name.value) {
            updatedObject["name"] = e.target.name.value;
        }
        if (e.target.phone.value) {
            updatedObject["phone"] = parseInt(e.target.phone.value);
        }
        
        fetch(`http://localhost:5000/api/contacts/${e.target.id.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedObject)
        })
        .then(() => this.getContacts())
        .catch(err => console.log(err));
    }

    deleteContact = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:5000/api/contacts/${e.target.id.value}`, {
            method: 'DELETE',
        })
        .then(() => this.getContacts())
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getContacts();
    }

    render() {
        let contactList = "";
        if (this.state.contacts) {
            contactList = this.state.contacts.map((contact, i) =>
                <li style={{ textAlign: "left", marginBottom: "1em" }}>
                    <strong>{contact.name}, {contact.phone}</strong>
                    <form onSubmit={this.updateContact}>
                        <label>Name: <input type="text" name="name" /> </label>
                        <label>Phone: <input type="text" name="phone" /> </label>
                        <input type="hidden" name="id" value={contact._id} />
                        <input type="submit" value="Update" />
                    </form>
                    <form onSubmit={this.deleteContact}>
                        <input type="hidden" name="id" value={contact._id} />
                        <input type="submit" value="Delete" />
                    </form>
                </li>
            );
        } else {
            contactList = "Loading...";
        }

        return (
            <div style={{ marginBottom: "5em" }}>
                <h1 className="App-title" style={{ textAlign: "center" }}>HackIllinois Backend Demo</h1>
                <div style={{ borderStyle: "solid", borderColor: "blue", textAlign: "center", paddingBottom: "1em", marginLeft: "8em", marginRight: "8em"}}>
                    <div>
                        <h2>My Contacts</h2>
                        <ul style={{ marginLeft: "5em" }}>
                            {contactList}
                        </ul>
                    </div>
                    <div>
                        <h2>Add Contact</h2>
                        <form onSubmit={this.addContact}>
                            <label>Name: <input type="text" name="name" /> </label>
                            <label>Phone: <input type="text" name="phone" /> </label>
                            <br /><br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
