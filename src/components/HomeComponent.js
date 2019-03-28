import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errmsg }) {
    console.log(isLoading)
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errmsg) {
        return (
            <h4>{errmsg}</h4>
        );
    } else {
        return (
            <FadeTransform in
                tranformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle className='h5'>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText className='text-info'>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errmsg={props.dishesErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading={props.promoLoading}
                        errmsg={props.promoErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                        isLoading={props.leaderLoading}
                        errmsg={props.leaderErrMsg} />
                </div>
            </div>
        </div>
    );
}

export default Home;