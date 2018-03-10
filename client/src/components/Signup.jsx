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
      error: false,
      messageHeader: '',
      messageContent: ''
    }
    this.signup = this.signup.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.enableSignUp = this.enableSignUp.bind(this);
  }

  signup(e) {
    // e.preventDefault();
    axios.get('/emailCheck', {
      params: {
        email: this.state.email
      }
    })
    .then((res)=> {
      console.log('res in client ', res)
      if( res.data === true) {
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
      } else {
        this.setState({
          messageHeader: 'Email not valid',
          messageContent: 'Please try again with a valid email address'
        })
      }
    })
    .catch((err)=> {
      console.log('err in client in verifying email ', err);
    })
  }

  onChangeUsername(e) {
    e.preventDefault()
    this.setState({username: e.target.value})
  }

  onChangePassword(e) {
    e.preventDefault()
    this.setState({password: e.target.value})
  }

  onChangeEmail(e) {
    e.preventDefault()
    this.setState({email: e.target.value})
  }

  enableSignUp() {
    this.setState({
      disabled: false
    })
  }


 
  render() {
    if (this.state.username.length === 0) {
      var messageHeader='Enter a username'
      var messageContent='Please make sure you enter a username.'
      var button = <Button type='submit' disabled={true}>Sign Up</Button>
   }  else if (this.state.password.length < 8) {
      var messageHeader='Enter valid password'
      var messageContent='Please make sure you enter a valid password with at least 8 characters.'
      var button = <Button type='submit' disabled={true}>Sign Up</Button>
   } 
   else if ( this.state.email.indexOf('.') === -1) {
      var messageHeader='Enter valid E-mail Address'
      var messageContent='Please make sure you enter a valid e-mail address.'
      var button = <Button type='submit' disabled={true}>Sign Up</Button>
    } 
    else {
      var messageHeader='Enter valid E-mail Address'
      var messageContent='Please make sure you enter a valid e-mail address.'
      var button = <Button type='submit' disabled={false}>Sign Up</Button>
    }

    if (this.state.error === true) {
      var messageHeader='We are sorry!'
      var messageContent='Looks like we could not sign you up! We will look into it. In the meantime please try editing your credentials and try again.'
    }

    if(this.state.messageHeader !== '') {
      var messageHeader = this.state.messageHeader;
      var messageContent = this.state.messageContent
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

              < Message 
                warning
                header={messageHeader}
                content={messageContent}
              /> 
              {button}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Signup
