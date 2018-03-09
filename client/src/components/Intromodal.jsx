import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import Drop from './Dropdown.jsx';


class Intromodal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen: false,

      }
      this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount () { 
      this.setState({ 
          modalOpen: true 
        })
    }

  handleClose () {
    this.setState({ 
        modalOpen: false 
    })
  }

  render() {
    return (
      <Modal
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Modal.Content className="modalContent">
        <div className="logo">Drinqify</div>
            <Icon name='play' color='green' size='huge'/> 
            <Icon.Group size = 'huge'>
                <Icon loading size='big' name='sun' color='green'/>
                <Icon name='cocktail' color='green'/>
            </Icon.Group>
            <Icon name='marker' color='green' size='huge'/>       
        </Modal.Content>
        <Modal.Actions>
          <Drop handleClose={this.handleClose} selectHandler={this.props.selectHandler}  />
        </Modal.Actions>
      </Modal>
    )
  }
}
export default Intromodal