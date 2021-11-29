import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    <p>-- {comment.autWor}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
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

const Dishdetail = (props) =>{
    return(
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <h1>Selected Option</h1>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div  className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.comments}/>
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;