import React, { Component } from 'react';
import './App.css';
import Main from './pages/Main';
import Results from './pages/Results';
import Product from './pages/Product';
import Cart from './pages//Cart';
import Success from './pages/Success';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import CommonFooter from './common/Footer';
import CommonHeader from './common/Header';
import Error from './common/Error';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import { getVisibleProducts } from "./reducers/product";
import Login from './pages/Login';
import { firebaseApp } from './firebase';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      results:[],
      term:'',
      isLogin: true,
      userGoogle:{}
    }
    this.updateTerm = this.updateTerm.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  /* componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ isLogin: !!user })
    })
  } */

  updateTerm(term){
    this.setState({ term })
  }

  updateList(newList, term) {
    term !== '' ?
      this.setState({
        results: newList,
        term
      })
    : 
      this.setState({results: []})
  }


  render(){
    const { term, results, isLogin, userGoogle } = this.state;
    const { products } = this.props;
    const updateTerm = this.updateTerm.bind(this);
    const updateList = this.updateList.bind(this);
    
if(isLogin){
      return ( 
          <Router>
            <CommonHeader
            term={term}
            updateTerm={updateTerm}
            updateList={updateList}
            products={products}
            userGoogle={userGoogle}/>
          <Switch>
                <Route path="/" exact>
                    <div className="App-container">
                      <Main 
                            products={products}
                            />      
                    </div>     
                </Route>
                <Route path="/results">
                    <div className="App-container">
                      <Results 
                              results={results}
                      />      
                    </div>     
                </Route>
                <Route 
                  path="/product/:id"
                  render={props => 
                    <div className="App-container">
                      <Product {...props} />      
                    </div> 
                  }>                
                </Route>
                <Route 
                  path="/cart"
                  render={props =>
                    <div className="App-container">
                      <Cart {...props} />      
                    </div> 
                  }>                
                </Route>
                <Route path="/success">
                    <div className="App-container">
                      <Success 
                      />      
                    </div>     
                </Route>
                <Route path="/favorite">
                    <div className="App-container">
                      <Favorite
                      />      
                    </div>     
                </Route>
                <Route path="/profile">
                    <div className="App-container">
                      <Profile 
                      />      
                    </div>     
                </Route>
                <Route path="/error">
                    <div className="App-container">
                      <Error 
                      />      
                    </div>     
                </Route>
          </Switch>
            <CommonFooter/>
        </Router>
      );
  }
  else{
    return(
      <Router>
        <Switch>
          <Route path="/" exact>
              <div className="App-container">
                <Login/>
              </div>     
          </Route>
        </Switch>
      </Router>
          
    )
  }
  }
}

const mapStateToProps = state =>({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps
)(App)