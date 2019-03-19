import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FootComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  render() {

    const HomePage = () => {
      return(
        <Home />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
