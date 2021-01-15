import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelect: "",
        title: "",
        content: "",
        date: new Date(),
        editing: false,
        _id: ""
    }

    onSubmit = async e => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelect
        };
        if(this.state.editing){
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        }else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href="/";
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({
            users: res.data,
            userSelect: res.data[0].username
        })
        if(this.props.match.params.id){
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
            const data = res.data;
            this.setState({
                title: data.title,
                content: data.content,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>

                    {/** SELECT USER */}
                    <div className="form-group">
                        <select 
                            className="form-control" 
                            name="userSelect" 
                            onChange={this.onInputChange}
                            select={this.state.userSelect}>
                            {
                                this.state.users.map (user => (
                                    <option key={user._id} value={user.username}>
                                        {user.username}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                               className="form-control" 
                               placeholder="Title"
                               onChange={this.onInputChange} 
                               value={this.state.title}
                               name="title" required/>                      
                    </div>

                    <div className="form-group">
                        <textarea 
                            name="content"
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.content}
                            placeholder="Content" required>
                        </textarea>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
