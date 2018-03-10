import React from 'react';
import { Icon, Input } from 'semantic-ui-react'


class ZipCodeRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            zipCodeInput:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handeSubmit = this.handeSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            zipCodeInput: e.target.value
        },() => {
            console.log('zipcode state ', this.state.zipCodeInput)
        })
    }

    handeSubmit(e) {
        e.preventDefault();
        this.setState({
            zipCodeInput: ''
        })
        this.props.setZipCode(this.state.zipCodeInput);
    }
 
    render() {
        return (
            <div className="ZipCodeRequest"> 
                <h3> To see a map of great spots in your area <br/>
                that are suited to your mood, please enable <br/>
                your location or input your zipcode below </h3>
                <Input
                        icon={<Icon name='search' inverted circular link onClick={this.handeSubmit}  />}
                        placeholder='Zipcode...'
                        value={this.state.zipCodeInput}
                        onChange={this.handleChange}
                    />
            </div>
        )
    }
}

export default ZipCodeRequest;