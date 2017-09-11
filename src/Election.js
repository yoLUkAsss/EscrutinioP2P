import React, { Component } from 'react';

class Election extends Component {
    constructor() {
        super();
        this.state = {
            name: 'Not election yet',
            message : '',
        };
        this.showName = this.showName.bind(this);
    }

    showName(event) {
        event.preventDefault();
        this.setState({
            name : event.target.value,
            message: 'Preselected name: ' + event.target.value
        });
    }


    render () {
        return (
            <div>
                <h2> Create New Election </h2>
                <h4>
                    {this.state.message}
                </h4>
                <form onChange={this.showName} onSubmit={this.props.submitName}>
                    <input
                        type="text"
                        placeholder="Name for election"
                        name="election"/>
                    <input type="submit" value="Guardar" />
                </form>
            </div>
        );
    }
}

export default Election
