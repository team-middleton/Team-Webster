import React from 'react';
import {Container} from 'semantic-ui-react';
import io from 'socket.io-client';

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messages: []
    }
    this.socket = io()
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      console.log('received message', data)
      console.log('mood', this.props.mood)
      if (data.mood === this.props.mood) {
        this.setState({messages: [...this.state.messages, data]})
      }
    })
  }

  componentDidUpdate() {
    let messages = document.getElementById('messages')
    messages.scrollTop = messages.scrollHeight
  }

  componentWillReceiveProps() {
    this.setState({messages: []})
  }

  sendMessage() {
    this.socket.emit('SEND_MESSAGE', {
      message: this.state.message,
      author: this.props.user || 'Anonymous',
      mood: this.props.mood
    })
    console.log('sent message', this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
      <Container>
        <div id="chat">
          <h1>Chat with others in your mood!</h1>
          <ul id="messages">
            {this.state.messages.map((message, index) => {
              return (<li key={index}>{message.author}: {message.message}</li>)
            })}
          </ul>
          <form>
            <input type="text" placeholder="Type here!" value={this.state.message} onChange={(event) => this.setState({message: event.target.value})} />
            <button onClick={(event) => {
              event.preventDefault()
              this.sendMessage()
            }}>Send</button>
          </form>
        </div>
      </Container>
    )
  }
}

export default Chat;