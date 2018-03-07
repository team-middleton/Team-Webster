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
        return(
        <div>
            <Container> 
                {this.props.concerts.map((concert, i) => {
                    return <ConcertItem concert={concert} key={i}/>
                })}
            </Container>
        </div>
        )
    }
}

export default ConcertsContainer