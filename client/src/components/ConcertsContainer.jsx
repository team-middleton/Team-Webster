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
            var concertsTitle = 
            <h5 className="concertListTitle" > Related concerts coming up in your area </h5>
            
        } else {
            var concertsTitle =
            <h3 className="concertListTitle" > Select your mood and enable location <br/> to view related concerts in your area </h3>
            
        }


        return(
            <div>
                    {concertsTitle}
            
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