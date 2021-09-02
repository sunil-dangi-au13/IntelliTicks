import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Property = props => (
    <tr>
        <td>{props.property.username}</td>
        <td>{props.property.description}</td>
        <td>{props.property.size}</td>
        <td>{props.property.date.substring(0,10)}</td>
        <td>
            <button className="btn btn-secondary"><Link to={"/edit/"+props.property._id} style={{color:"white"}}>Edit</Link></button> | <button className="btn btn-danger" onClick={() => {props.deleteProperty(props.property._id) }}>Delete</button>
        </td>
    </tr>
)

class PropertysList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: []
        }

        this.deleteProperty = this.deleteProperty.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/property/')
            .then(res => {
                this.setState({ property: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteProperty(id) {
        axios.delete('http://localhost:5000/property/' +id)
            .then(res => console.log(res.data));

        this.setState({ property: this.state.property.filter(el => el._id !== id)})
    }

    propertysList() {
        return this.state.property.map(currentproperty => {
            return <Property property={currentproperty} deleteProperty={this.deleteProperty} key={currentproperty._id} />
        })
    }

    render() { 
        return ( 
            <div className="container">
                <h3>List Property</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Size</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.propertysList()}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default PropertysList;