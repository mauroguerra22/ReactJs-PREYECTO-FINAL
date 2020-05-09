import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Cristian',
      products: [
        {
          id: 'prod01',
          name: 'notebook',
          brand: 'Asus',
          price: 19000
        },
        {
          id: 'prod02',
          name: 'notebook',
          brand: 'HP',
          price: 20000
        },
        {
          id: 'prod03',
          name: 'notebook',
          brand: 'Samsung',
          price: 21000
        },
        {
          id: 'prod04',
          name: 'notebook',
          brand: 'Hp',
          price: 22000
        }
      ]
    }
  }

  render(){
    const {userName, products } = this.state
  return (    
    <div className="App">
      <header className="App-container">
        <Main userName={userName} products={products}/>      
      </header>     
    </div>
  );
  }
}

