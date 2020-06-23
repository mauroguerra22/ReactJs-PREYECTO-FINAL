import React, { Component } from 'react';
import './App.css';
import Main from './pages/Main';
import Results from './pages/Results';
import Product from './pages/Product';
import Cart from './pages//Cart';
import Success from './pages/Success';
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

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      results:[],
      term:'',
      isLogin: false,
      userGoogle:{}
    }
    this.updateTerm = this.updateTerm.bind(this);
    this.updateList = this.updateList.bind(this);
  }

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

  setIsLogin = () => {
    this.setState({
      isLogin: true
    })
  }

  setUserGoogle = newUserGoogle =>{
    newUserGoogle !== null ?
      this.setState({
        userGoogle: newUserGoogle
      })
      :
      this.setState({
        userGoogle: {}
      })
  }

  render(){
    const { term, results, isLogin, userGoogle } = this.state;
    const { products } = this.props;
    const updateTerm = this.updateTerm.bind(this);
    const updateList = this.updateList.bind(this);
    const setIsLogin = this.setIsLogin.bind(this);
    const setUserGoogle = this.setUserGoogle.bind(this);
    
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
                <Login isLogin={isLogin} setIsLogin={setIsLogin} setUserGoogle={setUserGoogle}/>
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