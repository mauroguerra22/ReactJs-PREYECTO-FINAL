import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Results from './components/Results';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Cristian',
      products: [
        {
          id: 'prod01',
          name: 'Asus',
          brand: 'Asus',
          price: 19000
        },
        {
          id: 'prod02',
          name: 'HP',
          brand: 'HP',
          price: 20000
        },
        {
          id: 'prod03',
          name: 'Samsung',
          brand: 'Samsung',
          price: 21000
        },
        {
          id: 'prod04',
          name: 'Play',
          brand: 'Play',
          price: 22000
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
      </Switch>
    </Router>  
  );
  }
}

