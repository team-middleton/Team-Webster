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
            var concertsTitle = "Related concerts coming up in your area"
        } else {
            var concertsTitle =" Select your mood to view concerts in your area"
        }
        return(
            <div>
                <h5 className="concertListTitle" > {concertsTitle} </h5>
            
                <div className = "concertList" style={{margin:'0 auto', overflow:'auto'}}>
                        <Container> 
                            {this.props.concerts.map((concert, i) => {
                                return <ConcertItem concert={concert} key={i}/>
                            })}
                        </Container>
                </div>
            </div>
        )
    }
}

export default ConcertsContainer