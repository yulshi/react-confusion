import React from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish }) {
    return (
        <Link to={`/menu/${dish.id}`}>
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle className='h5'>{dish.name}</CardTitle>
                    <CardText className='text-secondary'>{dish.description}</CardText>
                </CardImgOverlay>
            </Card>
        </Link>
    );
}

function Menu(props) {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1" key={dish.id}>
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    } else if (props.dishes.errmsg) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.dishes.errmsg}</h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;