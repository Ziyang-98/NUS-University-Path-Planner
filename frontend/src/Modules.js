import React, {Component} from "react";
import axios from "axios";

class Modules extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            modules : null
        }
    }

    async componentDidMount() {
        const data = (await axios.get("http://localhost:3000/"));
        console.log(data);
        this.setState({
            modules : data.data,
        });
    }

    render() {
        return (
            <h1>{this.state.modules}</h1>
        )
    }
}

export default Modules;