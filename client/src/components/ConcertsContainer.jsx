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
            <h1 className="concertListTitle" > Related concerts coming up in your area </h1>
            
        } else {
            var concertsTitle =
            <h3 className="ZipCodeRequest" > 
            Input a zip code or enable location to <br/>
            view some upcoming mood-appropriate <br/> 
            concerts in your area </h3>
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