import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

export default class NotesList extends Component {

    state={
        notes:[]
    }

    async getNotes() {
        const res = await axios.get('http://localhost:4000/api/notes');
        console.log(res);
        this.setState({
            notes: res.data
        })
    }

    componentDidMount(){
        
        this.getNotes();
    }

    deleteNote = async(id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h4>{note.title}</h4>
                                    <Link className="btn btn-success ml-auto" to={"/edit/" + note._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">                                   
                                    <p>{note.content}</p>
                                    
                                </div>
                                <div className="card-footer">
                                    <h6>{note.author}</h6>
                                    <p>{format(note.date)}</p>
                                    <button className="btn btn-danger btn-block" onClick={()=> this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
