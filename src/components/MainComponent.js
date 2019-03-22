import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Header from './HeaderComponent';
import Footer from './FootComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
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
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errmsg}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match, location, history }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.id, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errmsg={this.props.dishes.errmsg}
          comments={this.props.comments.filter(c => c.dishId === parseInt(match.params.id, 10))}
          addComment={this.props.addComment} />
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
