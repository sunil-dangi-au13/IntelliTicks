import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateProperty extends Component {

    constructor(props){
        super();
        this.state = {
            username: "",
            description: "",
            size: "",
            date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    });
                }
            })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value})
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value})
    }
    onChangeSize(e) {
        this.setState({ size: e.target.value})
    }
    onChangeDate(date) {
        this.setState({ date: date})
    }
    onSubmit(e) {
        e.preventDefault();
        const property = {
            username: this.state.username,
            description: this.state.description,
            size: this.state.size,
            date: this.state.date
        }

        console.log(property);

        axios.post('http://localhost:5000/property/add', property)
            .then(res => console.log(res.data));

        window.location = "/";
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Create New Property</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} >
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Size: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Size}
                            onChange={this.onChangeSize}
                        />
                    </div>
                     
                    <div className="form-group">
                        <input type="submit" value="Create New Property" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default CreateProperty;