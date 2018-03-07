import React from 'react'
import { Container } from 'semantic-ui-react';
import ConcertItem from './ConcertItem.jsx';

class ConcertsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state= {

        }
    }
    render() {
        if(this.props.concerts.length) {
            var concertsTitle = <h5 className="concertListTitle" > Related concerts in your area </h5>
        } else {
            var concertsTitle = <div></div>
        }
        return(
        <div className = "concertList">
            <Container> 
                {concertsTitle}
                {this.props.concerts.map((concert, i) => {
                    return <ConcertItem concert={concert} key={i}/>
                })}
            </Container>
        </div>
        )
    }
}

export default ConcertsContainer