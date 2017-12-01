import React, { Component } from 'react';
import './App.css';
import {Message, Delete, Container} from 'reactbulma';
import axios from 'axios';

class App extends Component {

  // Setting State
  state = {
    messages: [],
  }

  render() {

    // Destructuring Props
    const { messages } = this.state

    return (
      <div className="App">
        <h1>Welcome to Fresh New Text!</h1>

        <Container >
          {messages.map(messageText => ([
            <Message dark>
              <Message.Header>
                <p>{messageText.author}</p>
                <Delete />
              </Message.Header>
              <Message.Body>{messageText.content}</Message.Body>
            </Message>
            ])
            )
          }
        </Container>

      </div>
    )
  }


  componentDidMount() {
    // Grab out messages from the API
    axios.get('/api/messages').then((response) => {
      console.log('Success!')
      console.log(response)
      // Everything worked, response.data is our array of messages
      this.setState({
        messages: response.data
      })
    })

      .catch(function (error) {
        // Something went wrong
        console.warn(error);
      });
  }

}

export default App;
