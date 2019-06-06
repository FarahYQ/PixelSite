import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPhoto,receivePhotoErrors, clearPhotoErrors } from '../../actions/photo_actions'

class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: "",
            image: null,
            location: "null",
            description: "",
            lat: null,
            lng: null,
            photoURL: ""
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
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
        this.props.postPhoto(formData)
            .then(res => { this.props.history.push('/')})
            .catch(errors => { 
                this.props.getErrors(errors)
            });
    }

    renderErrors() {
        const errors = this.props.errors;
        return (
            <div>
                <ul>
                {Object.keys(errors).map((key, index) => {
                    return <li className="photoform-errors" key={index}>{`${errors[key]}`}</li>
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
            this.setState({ image: file, photoURL: fileReader.result});
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    handleRemovePhoto(e) {
        this.setState({ image: null, photoURL: null });
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {

        const imagePreview = this.state.photoURL ? <div className='photo-preview-wrap'>
            <i className="fa fa-trash" aria-hidden="true" onClick={this.handleRemovePhoto}></i>
            <img className='photo-preview' src={this.state.photoURL}/>
        </div> : null;

        return (
        <div className="container">
            <div className="add-photo-title">Add Another Photo</div>
            <div>
                <form className="photo-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="input-title">Photo Caption</div>
                    <input className="photo-input" type="value" onChange={this.update('caption')}/>

                    <div className="input-title">Attach Photo</div>
                    <div className="input-tagline">(jpeg or jpg)</div>
                    <div className="attach-photo-form">
                        <div className="attach-photo">
                            {imagePreview ? imagePreview : <input type="file" className="attach-photo-file-input" onChange={this.handleFile}/>}
                        </div>
                    </div>

                    <div className="input-title">Photo Description</div>
                    <div className="input-tagline">Describe your photo in detail. What were you doing and who were you with? What do you love about this photo? This'll help you when searching later.</div>
                    <textarea className="photo-input" type="value" onChange={this.update('description')}></textarea>
                    <div></div>
                    <div className="add-photo-errors">{this.renderErrors()}</div>
                    <br/>
                    <input className="photoform-submit-btn" type="submit" value="SUBMIT"/>
                </form>
            </div>
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
        postPhoto: photo => dispatch(addPhoto(photo)),
        getErrors: errors => dispatch(receivePhotoErrors(errors)),
        clearErrors: () => dispatch(clearPhotoErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPhoto));