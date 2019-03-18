import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {

    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {

    const comment = comments.map(element => {
        return(
            <li>
                {element.comment}
            </li>
        );
    });

    return (
        <ul>
            {comment}
        </ul>
    );

}

const DishDetail = (props) => {

    if (!props.dish) {
        return (<div></div>);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;