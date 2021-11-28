import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

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

function RenderComments({dish}){
    if (dish!=null){
        const comments = dish.comments.map(comment =>{
            return (
                <div key={comment.id}>
                    {comment.comment}
                    <p>-- {comment.autWor}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            );
        });

        return (
            <div>
                <div><h2>Comments</h2></div>
                {comments}
            </div>
        );
    } else return null;
}

const Dishdetail = (props) =>{
    return(
        <div className="container">
            <h1>Selected Option</h1>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.selectedDish} />
                </div>
                <div  className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.selectedDish}/>
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;