import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Header from './HeaderComponent';
import Footer from './FootComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromos, fetchLeaders, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchComments: () => dispatch(fetchComments()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchComments();
  }

  render() {

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errmsg}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMsg={this.props.promotions.errmsg}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMsg={this.props.leaders.errmsg}
        />
      );
    };

    const DishWithId = ({ match, location, history }) => {
      console.log(this.props)
      return (
        <DishDetail dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.id, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errmsg={this.props.dishes.errmsg}
          comments={this.props.comments.comments.filter(c => c.dishId === parseInt(match.params.id, 10))}
          commentsErrMsg={this.props.comments.errmsg}
          postComment={this.props.postComment} />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:id' component={DishWithId} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
