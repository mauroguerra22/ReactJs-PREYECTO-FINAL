import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Results from './components/Results';
import Product from './components/Product';
import Cart from './components/Cart';
import Success from './components/Success';
import CommonFooter from './common/Footer';
import CommonHeader from './common/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { firebaseApp } from './firebase';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Cristian',
      products: [],
      results:[],
      term:''
    }
    this.updateTerm = this.updateTerm.bind(this);
    this.updateList = this.updateList.bind(this);
    this.productsRef = firebaseApp.database().ref().child('products');
  }

  componentDidMount(){
    this.listenForProducts(this.productsRef);
  }

  listenForProducts(productsRef){
    productsRef.on('value', snap =>{
      let products = [];
      snap.forEach(child =>{
        products.push({
          name: child.val().name,
          brand: child.val().brand,
          price: child.val().price,
          id: child.val().id
        });
      })

      this.setState({ products })

    });
  }

  updateTerm(term){
    this.setState({ term })
  }

  updateList(newList,term){
    const { products } = this.state;
    term !== '' ?
      this.setState({
        results: newList,
        term
      }) : 
      this.setState({results: products})
  }

  render(){
    const { userName, products, term, results } = this.state;
    const updateTerm = this.updateTerm.bind(this);
    const updateList = this.updateList.bind(this);

  return (  
    <Router>
      <CommonHeader
          userName={userName}
          term={term}
          updateTerm={updateTerm}
          updateList={updateList}
          products={products}
        />
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
        <Route path="/products/:id">
            <div className="App-container">
              <Product 
              />      
            </div>     
        </Route>
        <Route path="/cart">
            <div className="App-container">
              <Cart 
              />      
            </div>     
        </Route>
        <Route path="/success">
            <div className="App-container">
              <Success 
              />      
            </div>     
        </Route>
      </Switch>
      <CommonFooter/>
    </Router>  
  );
  }
}

