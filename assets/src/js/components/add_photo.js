import React, { Component } from 'react';
// import { connect  } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import merge from 'lodash/merge';
import axios from 'axios';

class AddPhoto extends Component {
    constructor() {
        super();
        this.state = {
            caption: "",
            image: null,
            location: "",
            description: ""
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name)
        fd.append('caption', this.state.caption)
        fd.append('location', this.state.location)
        fd.append('description', this.state.description)
        axios.post('http://localhost:8000/gallery/upload', fd)
            .then(res => {
                console.log(res);
            })
            .catch(errors => {
                console.log(errors);
            })
        }

    renderErrors() {
        return '';
    }

    update(field) {
        return (e)=>(this.setState({[field]:e.target.value}))
      }

    imageSelectedHandler(e) {
        this.setState({
            image: event.target.files[0]
        })
    }

    render() {
        console.log('addphoto')
        return (
            
        <div className="campaign-form">
            <div className="title-row">
            <div className="title"> Gallery </div>
            <div className="basics"> Add Photo </div>
            </div>
            <div className="basics-section">Basics</div>
            <div className="basics-instr">Add another photo for your gallery!</div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="input-title">Caption</div>
                <div className="input-tagline">Add a short caption for your photo.</div>
                <input type="value" onChange={this.update('caption')}/>

                <div className="input-title">Attach Photo</div>
                <div className="input-tagline">Make sure it's in jpg format - that's the only acceptable format so far.</div>
                <input type="file"  onChange={(e) => this.imageSelectedHandler(e)}/>

                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                        <label className="custom-file-label" for="inputGroupFile02">Choose file</label>
                    </div>
                    <div className="input-group-append">
                        <span className="input-group-text" id="">Upload</span>
                    </div>
                </div>
                <div className="input-title">Location</div>
                <div className="input-tagline">Add details about location like city, state, or country.</div>
                <input className="start-camp-duration" type="value" onChange={this.update('location')}/>

                <div className="input-title">Photo Description</div>
                <div className="input-tagline">Describe your photo in detail. What were you doing and who were you with? What do you love about this photo? This'll help you when searching later.</div>
                <input type="value" onChange={this.update('description')}/>
                <div></div>
                <div className="create-campaign-errors">{this.renderErrors()}</div>
                <br/>
                <input className="start-camp-submit" type="submit" value="SUBMIT"/>
            </form>
        </div>
        )

    }
}

export default AddPhoto;