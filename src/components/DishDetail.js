import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody,
    Row, Col, Button, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {

    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle className='h5'>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments, postComment, dishId, commentsErrMsg }) {

    if (commentsErrMsg) {
        return (
            <div className='text-danger'>
                {commentsErrMsg}
            </div>
        );
    }
    if (comments != null) {
        const formater = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p className='text-muted'>
                                    <i class="fa fa-user"></i> {comment.author}
                                    {comment.date
                                        ? <span><i className='fa fa-at px-1'></i>{formater.format(new Date(Date.parse(comment.date)))}</span>
                                        : ''}
                                </p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }

}

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleCommentSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState(
            { isModalOpen: !this.state.isModalOpen }
        );
    }

    render() {
        return (
            <div>
                <Button color='primary' onClick={this.toggleModal} size='sm'>
                    Add Comments
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Please Leave Your Comments
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleCommentSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id='rating' name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='author' md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model='.author' id='author' name='author'
                                        className='form-control' placeholder='Author Name' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model='.comment' id='comment' name='comment'
                                        rows={5} className='form-control' />
                                </Col>
                            </Row>
                            <Button type='submit' value='submit' color='primary'>
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function handleCommentSubmit(values) {
    alert(JSON.stringify(values));
}

function DishDetail(props) {

    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errmsg) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errmsg}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className='container'>
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
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                            commentsErrMsg={props.commentsErrMsg} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;