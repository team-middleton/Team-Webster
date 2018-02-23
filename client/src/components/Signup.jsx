import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from '../index.jsx';
import {Button, Form, Grid, Message} from 'semantic-ui-react'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      disabled: true,
      error: false
    }
    this.signup = this.signup.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  signup(e) {
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }).then(() => {
      this.setState({username: '', password: '', email: ''});
      ReactDOM.render(<App />, document.getElementById('app'));
    }).catch((error) => {
      this.setState({
        error: true
      })
      throw error;
    })
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  render() {
    let message;
    if (this.state.username.length === 0) {
     message = <Message
       warning
       header='Enter a username'
       content='Please make sure you enter a username.'
     />;
   }  else if (this.state.password.length < 8) {
     message = <Message
       warning
       header='Enter valid password'
       content='Please make sure you enter a valid password with at least 8 characters.'
     />;
   } else if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.') === -1) {
      message = <Message
        warning
        header='Enter valid E-mail Address'
        content='Please make sure you enter a valid e-mail address.'
      />;
    } else {
      this.setState({
        disabled: false
      })
    }

    if (this.state.error === true) {
      message = <Message
        error
        header='We are sorry!'
        content='Looks like we could not sign you up! We will look into it. In the meantime please try editing your credentials and try again.'
      />;
    }

    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <h1>Sign Up!</h1>
            <Form onSubmit={this.signup} warning error={this.state.error}>
              <Form.Field>
                <label style={{color: 'white'}}>Username</label>
                <input type='text' name='username' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername}/>
              </Form.Field>
              <Form.Field>
                <label style={{color: 'white'}}>Password</label>
                <input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword}/>
              </Form.Field>
              <Form.Field>
                <label style={{color: 'white'}}>E-mail</label>
                <input type='text' placeholder='Enter Email' value={this.state.email} onChange={this.onChangeEmail}/>
              </Form.Field>
              {message}
              <Button type='submit' disabled={this.state.disabled}>Sign Up</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Signup
