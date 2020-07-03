import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router';

class ModuleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : "",
            redirect : false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value : event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        const value = event.target[0].value;
        this.setState({
            value : value,
            redirect : true
        })
    }

    render() {
        if (this.state.redirect) {
            const url = `/module/${this.state.value}`
            return <Redirect to={url} />
        } 
        return (
            <form id="module" onSubmit={this.handleSubmit}>
                <label>
                    Search module :
                    <br />
                    <input value={this.state.value} placeholder="Enter a module code" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ModuleForm;