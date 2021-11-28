import React, {Component} from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishdetailComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish : null
        }
    }

    renderDish(dish){
        if (dish!=null)
            return(
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
        else
            return (
                <div>Nothing is selected.</div>
            );
    }

    renderComments(dish){
        if (dish!=null){
            const comments = dish.comments.map(comment =>{
                return (
                    <div key={comment.id}>
                        {comment.comment}
                        <p>-- {comment.author}, {comment.date}</p>
                    </div>
                );
            });
            return(
                <div>
                    <div><h2>Comments</h2></div>
                    {comments}
                </div>
            );
    }}

    render(){
        return (
            <div className="container">
                <h1>Selected Option</h1>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                  </div>
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish)}
                  </div>
                </div>
            </div>
        );
    }
}

export default DishdetailComponent;