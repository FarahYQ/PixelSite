import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPhoto } from '../actions/photo_actions'

class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: "",
            image: null,
            location: "",
            description: "",
            lat: null,
            lng: null,
            photoURL: ""
        }
        this.handleFile = this.handleFile.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.image) {
            formData.append('image', this.state.image)
        }
        formData.append('caption', this.state.caption)
        formData.append('location', this.state.location)
        formData.append('description', this.state.description)
        this.props.postPhoto(formData);
        }

    renderErrors() {
        const errors = this.props.errors;
        return (
            <div>
                <ul>
                {Object.keys(errors).map((key, index) => {
                    return <li key={index}>{`${key}: ${errors[key]}`}</li>
                })}
                </ul>
            </div>
        )
    }

    update(field) {
        return (e)=>(this.setState({[field]:e.target.value}))
    }

    handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        this.setState({ image: file, photoURL: "url"});
    };
    if (file) {
        fileReader.readAsDataURL(file);
    }
}

    render() {
        return (
            
        <div className="campaign-form">
            <div className="title-row">
            <div className="title"> Gallery </div>
            <div className="basics"> Add Photo </div>
            </div>
            <div className="basics-instr">Add another photo for your gallery!</div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="input-title">Caption</div>
                <div className="input-tagline">Add a short caption for your photo.</div>
                <input type="value" onChange={this.update('caption')}/>

                <div className="input-title">Attach Photo</div>
                <div className="input-tagline">Make sure it's in jpg format - that's the only acceptable format so far.</div>
                <input type="file"  onChange={this.handleFile}/>


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

const mapStateToProps = state => {
    return {
        errors: state.errors.photos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postPhoto: photo => dispatch(addPhoto(photo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);