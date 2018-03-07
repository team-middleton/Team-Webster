import React, { Component } from 'react';
import { Message, Grid } from 'semantic-ui-react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class ConcertList extends Component {
constructor(props){
    super(props);
  this.state = { 
      visible: false 
    }
    this.toggleVisibility = this.toggleVisibility.bind(this);
}

  toggleVisibility () {
       this.setState({ visible: !this.state.visible })
  }

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' direction='bottom' visible={visible} inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='https://www.fiveclipart.com/wp-content/uploads/2017/03/captivating-green-check-mark-clip-art-green-check-mark-clip-art-green-check-mark-clip-art-green-check-mark-microsoft-clip-art-free-clipart-green-check.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default ConcertList