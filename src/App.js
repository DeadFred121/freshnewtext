import React, { Component } from 'react';
import './App.css';
import {Message, Container, Hero, Title, SubTitle, Input, Button} from 'reactbulma';
import axios from 'axios';


class App extends Component {

  // Setting State
  state = {
    messages: [],
    userName: '',
    userMessage: ''
  }

  onQueryName = (event) => {
    // Update our username field as we type
    this.setState({
      userName: event.target.value
    })
  }

  onQueryMessage = (event) => {
    // Update our message field as we type
    this.setState({
      userMessage: event.target.value
    })
  }

  // Handle the submission of a new message
  addMessage = (event) => {
    // Prevent the browser from refreshing upon pressing button
    event.preventDefault();

    // Make copy of current messages
    const currentMessages = [...this.state.messages];


    if (this.state.userName && this.state.userMessage) {

      axios.post('/api/messages', {
        author: this.state.userName,
        content: this.state.userMessage
      })
        .then((response) => {
          console.log(response.data);
          currentMessages.unshift(response.data);
          this.setState({
            messages: response.data,
            userName: '',
            userMessage: ''
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  render() {

    // Destructuring Props
    const { messages, userMessage, userName } = this.state

    return (
      <div className="App">

        <Hero warning bold>
          <Hero.Body>
            <Container>
              <Title>
                Welcome to Fresh New Text!
              </Title>
              <SubTitle>
                Yeezy would be proud!
              </SubTitle>
            </Container>
          </Hero.Body>
        </Hero>

        

        <Container>

          <form onSubmit={this.addMessage}>
            <label htmlFor="large">Username:</label>
            <Input value={userName} placeholder="Enter your username, cuz!" large id="large" onChange={this.onQueryName}/>
            <br />
            <label htmlFor="normal">Message:</label>
            <Input value={userMessage} placeholder="Whatchu got to say?" id="normal" onChange={this.onQueryMessage} />
            <Button>Send</Button>
          </form>
          <hr />
          <br />

          {
            messages.map(message => {
              let { color, content, author } = message
              return ( 
                <Message
                primary={color === 'primary'}
                dark={color === 'dark'}
                plain={color === ''}
                success={color === 'success'}
                info={color === 'info'}
                warning={color === 'warning'}
                danger={color === 'danger'}>
                  <Message.Header>
                    <p>{author}</p>
                  </Message.Header>
                  <Message.Body>{content}</Message.Body>
                </Message>
              )
            })
          }
        </Container>
      </div>
    )
  }


  componentDidMount() {
    // Grab out messages from the API
    axios.get('/api/messages').then((response) => {
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
