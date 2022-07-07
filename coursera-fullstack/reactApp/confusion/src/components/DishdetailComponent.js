import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
    if (dish!=null){
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                </CardBody>
                <Card body>
                    <CardText>{dish.description}</CardText>
                </Card>
            </Card>
        );
    } else return null;
}

function RenderComments({comments}){
    if (comments!=null){
        const commentsDisplay = comments.map(comment =>{
            return (
                <div key={comment.id}>
                    {comment.comment}
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            );
        });

        return (
            <div>
                <div><h2>Comments</h2></div>
                {commentsDisplay}
            </div>
        );
    } else return null;
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
            isDropdownOpen: false,
            inputName: '',
            inputComment: '',
            ratingSelected: 0,
            touched: {
                inputName: false,
                inputComment: false,
                ratingSelected: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    validate(inputName, inputComment, ratingSelected) {
        const errors = {
            inputName: '',
            inputComment: '',
            ratingSelected: ''
        };

        if (this.state.touched.inputName && inputName.length < 3)
            errors.inputName = 'Must be >= 3 characters';
        else if (this.state.touched.inputName && inputName.length > 15)
            errors.inputName = 'Must be <= 15 characters';
        
        if (this.state.touched.inputComment && inputComment.length < 1)
            errors.inputComment = 'Field cannot be empty';

        return errors;
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                <h1>Selected Option</h1>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="row col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments}/>
                        <div className="col-12 mt-2 mb-3">
                            <Button color="primary" onClick={this.toggleModal}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment
                            </Button>
                            <Modal isOpen={this.state.isModalOpen}
                            toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>
                                Submit Comment
                                </ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        
                                        <FormGroup>
                                        <Label for="exampleSelect">
                                            Select Rating 
                                        </Label>
                                        <Input
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                            className="ml-2">
                                            <option>
                                                1
                                            </option>
                                            <option>
                                                2
                                            </option>
                                            <option>
                                                3
                                            </option>
                                            <option>
                                                4
                                            </option>
                                            <option>
                                                5
                                            </option>
                                        </Input>
                                        </FormGroup>
                                        <Row className="form-group container">
                                            <Label htmlFor="inputName">Name</Label>
                                            <Control.text model=".inputName" id="inputName" name="inputName"
                                                placeholder="Enter your name."
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }} />
                                            <Errors
                                                className="text-danger"
                                                model=".inputName"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }} />
                                        </Row>
                                        <Row className="form-group container">
                                            <Label htmlFor="inputComment">Comment</Label>
                                            <Control.textarea model=".inputComment" id="inputComment" name="inputComment"
                                                placeholder="Enter your comment."
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(1)
                                                }} />
                                            <Errors
                                                className="text-danger"
                                                model=".inputComment"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Field cannot be empty'
                                                }} />
                                        </Row>
                                        <Row className="form-group container">
                                            <Button type="submit" color="primary">
                                            Submit Comment
                                            </Button>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dishdetail;