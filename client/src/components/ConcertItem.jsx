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
                        <Grid.Column width={4}>
                            <div className="concertImageDiv">
                                <img className="concertImage" src={this.props.concert.imageUrl} />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div className="concertTextColumn">
                                <p> <a className="concertName"  href={this.props.concert.url}  target="_blank"> {this.props.concert.name} </a></p>
                                <p className="concertDescription"> {this.props.concert.venue} </p>
                                <p className="concertDescription"> {this.props.concert.date} </p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div> 
        )
    }

}
export default ConcertItem;
//code to add pics
{/* <Grid.Column width={3}>
<img className="concertImage" src={this.props.concert.imageUrl} />
</Grid.Column> */}

// code to have price table
// if(!this.props.concert.minPrice || !this.props.concert.maxPrice) {
//     var minPrice = <p className="concertDescription"> No pricing data  </p>
//     var maxPrice = <p className="concertDescription"> available </p>
// } else {
//     var minPrice = <p className="concertDescription"> Min price: ${this.props.concert.minPrice} </p>
//     var maxPrice = <p className="concertDescription"> Max price: ${this.props.concert.maxPrice} </p>
// }
{/* <Grid.Row columns={16}>
                        <Grid.Column width={10}>
                            <div className="concertTextColumn">
                                <p> <a className="concertName"  href={this.props.concert.url}  target="_blank"> {this.props.concert.name} </a></p>
                                <p className="concertDescription"> {this.props.concert.venue} </p>
                                <p className="concertDescription"> {this.props.concert.dateTime} </p>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6} className="priceTextColumn">
                            <div className="concertTextColumn">
                                <p className="priceTitle"> Price Range </p>
                                {minPrice}
                                {maxPrice}
                            </div >
                        </Grid.Column>
                    </Grid.Row> */}

