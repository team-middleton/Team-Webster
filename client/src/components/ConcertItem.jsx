import React from 'react';
import { Message, Grid } from 'semantic-ui-react';

class ConcertItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }
    render() {
        return(
            <div>
                <Grid stackable> 
                    <Grid.Row columns={16} centered>
                        <Grid.Column width={5}>
                            <img className="concertImage" src={this.props.concert.url} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <p> random text </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

export default ConcertItem;