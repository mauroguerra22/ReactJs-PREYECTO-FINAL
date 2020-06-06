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
import { firebaseApp } from './firebase';
import { connect } from "react-redux";
import { getVisibleProducts } from "./reducers/product";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
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

  findProductById(id){
    const { products } = this.state;
    const product = products.filter(p => p.id == id);
    console.log(product);
    this.setState({ product })
  }

  listenForProducts(productsRef){
    productsRef.on('value', snap =>{
      let products = [];
      snap.forEach(child =>{
        products.push({
          name: child.val().name,
          brand: child.val().brand,
          price: child.val().price,
          descriptions: child.val().descriptions,
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
    const { term, results } = this.state;
    const { products } = this.props;
    const updateTerm = this.updateTerm.bind(this);
    const updateList = this.updateList.bind(this);

  return (  
    <Router>
      <CommonHeader
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
}

const mapStateToProps = state =>({
  products: getVisibleProducts(state.products)
})

export default connect(mapStateToProps)(App)