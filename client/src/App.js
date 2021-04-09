import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { contacts: null };
    }

    getContacts() {
        fetch("http://localhost:5000/api/contacts")
        .then(res => res.json())
        .then(res => this.setState({ contacts: Array.from(res) }))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getContacts();
    }

    render() {
        var contactList = "";
        if (this.state.contacts) {
            contactList = this.state.contacts.map((object, i) =>
                <li key={i}>{object.name}</li>
            );
        }

        return (
            <div className="App">
                <h1 className="App-title">HackIllinois Backend Demo</h1>
                <p className="App-intro">List of Contacts</p>
                <ul>
                    {contactList}
                </ul>
            </div>
        );
    }
}

export default App;
