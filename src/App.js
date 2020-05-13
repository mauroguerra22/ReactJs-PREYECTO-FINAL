import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Results from './components/Results';
import Product from './components/Product';
import Cart from './components/Cart';
import Success from './components/Success';
import N1 from './assets/img/Notebook/Notebook1.jpg';
import N2 from './assets/img/Notebook/Notebook2.jpg';
import N3 from './assets/img/Notebook/Notebook3.jpg';
import N4 from './assets/img/Notebook/Notebook4.jpg';
import N5 from './assets/img/Notebook/Notebook5.jpg';
import N6 from './assets/img/Notebook/Notebook6.jpg';
import N7 from './assets/img/Notebook/Notebook7.jpg';
import N8 from './assets/img/Notebook/Notebook8.jpg';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Cristian',
      products: [
        {
          id: 'prod01',
          name: 'Notebook Samsung',
          brand: 'Samsung',
          price: 19000,
          image:N1
        },
        {
          id: 'prod02',
          name: 'Notebook Samsung',
          brand: 'Samsung',
          price: 27000,
          image:N2
        },
        {
          id: 'prod03',
          name: 'Notebook HP',
          brand: 'HP',
          price: 21000,
          image:N3
        },
        {
          id: 'prod04',
          name: 'Notebook HP',
          brand: 'HP',
          price: 32000,
          image:N4
        },
        {
          id: 'prod05',
          name: 'Notebook HP',
          brand: 'HP',
          price: 37000,
          image:N5
        },
        {
          id: 'prod06',
          name: 'Notebook Dell',
          brand: 'Dell',
          price: 42000,
          image:N6
        },
        {
          id: 'prod07',
          name: 'Notebook Dell',
          brand: 'Dell',
          price: 40000,
          image:N7
        },
        {
          id: 'prod08',
          name: 'Notebook Macbook',
          brand: 'Macbook',
          price: 52000,
          image:N8
        }
      ],
      results:[],
      term:''
    }
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
      <Switch>
        <Route path="/" exact>
            <div className="App-container">
              <Main 
                    userName={userName}
                    products={products}
                    updateTerm={updateTerm}
                    term={term}
                    updateList={updateList}
              />      
            </div>     
        </Route>
        <Route path="/results">
            <div className="App-container">
              <Results 
                      userName={userName}
                      results={results}
                      term={term}
              />      
            </div>     
        </Route>
        <Route path="/products/:id">
            <div className="App-container">
              <Product 
                      userName={userName}
                      results={results}
                      term={term}
              />      
            </div>     
        </Route>
        <Route path="/cart">
            <div className="App-container">
              <Cart 
                      userName={userName}
                      results={results}
                      term={term}
              />      
            </div>     
        </Route>
        <Route path="/success">
            <div className="App-container">
              <Success 
                      userName={userName}
                      results={results}
                      term={term}
              />      
            </div>     
        </Route>
      </Switch>
    </Router>  
  );
  }
}

