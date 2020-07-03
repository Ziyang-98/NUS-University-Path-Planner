import React from "react";
import axios from "axios";
import ModuleForm from "../ModuleForm";
import { Redirect } from "react-router";

class Module extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            redirect : false,
            title: "",
            preclusions: "",
            description: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const module = (await axios.get(`https://api.nusmods.com/v2/2018-2019/modules/${params.moduleName}.json`)).data;
        this.setState({
            title: `${params.moduleName} ${module.title}`,
            preclusions: module.preclusions,
            description: module.description
        });
    }

    handleClick() {
        this.setState({redirect : true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div>
                <button onClick={this.handleClick}>Search again!</button>
                <h1>{this.state.title}</h1>
                <p>Preclusions: {this.state.preclusions}</p>
                <p>Description: {this.state.description}</p>
            </div >
        )
    }
}

export default Module;