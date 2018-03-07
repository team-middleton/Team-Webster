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
                <Grid stackable className="concertGrid" > 
                    <Grid.Row columns={16}>
                        <Grid.Column width={3}>
                            <img className="concertImage" src={this.props.concert.imageUrl} />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <div className="concertTextColumn">
                                <p> <a className="concertName"  href={this.props.concert.url}  target="_blank"> {this.props.concert.name} </a></p>
                                <p className="concertDescription"> {this.props.concert.venue} </p>
                                <p className="concertDescription"> {this.props.concert.dateTime} </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

export default ConcertItem;