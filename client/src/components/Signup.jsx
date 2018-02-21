import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from '../index.jsx';
import {Button, Form, Grid} from 'semantic-ui-react'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.signup = this.signup.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
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

  onBackClick() {
    ReactDOM.render(<App />, document.getElementById('app'));
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <h1>Sign Up!</h1>
            <Form onSubmit={this.signup}>
              <Form.Field>
                <label>Username</label>
                <input type='text' name='username' placeholder='Enter Username' value={this.state.username} onChange={this.onChangeUsername}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.onChangePassword}/>
              </Form.Field>
              <Form.Field>
                <label>E-mail</label>
                <input type='text' placeholder='Enter Email' value={this.state.email} onChange={this.onChangeEmail}/>
              </Form.Field>
              <Button type='submit'>Sign Up</Button>
            </Form>
            <br />
            <Button type='button' onClick={this.onBackClick}>Back</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Signup
