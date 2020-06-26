import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import { getVisiblePurchases } from "../reducers/purchases";
import { getVisibleProducts } from "../reducers/product";
import { getFetchedPurchases } from "../actions";
import { connect } from "react-redux";

class Purchases extends Component {
  state ={
    productsParchases:[]
  }
  getPhoto(id){
    let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
    return photo;
  }

  componentDidMount(){
    this.props.dispatch(getFetchedPurchases());
  }

  getProductsPurchases = () => {
    this.props.purchases.filter(purchase => {
      purchase.addedIds.forEach(p =>{
        const resultado = this.props.products.find(prod => prod.id === p);
        if(resultado){
          this.state.productsParchases.push(resultado);
          return this.state.productsParchases;
        }
        return this.state.productsParchases;
      })
      return this.state.productsParchases;
    })
  }

  render() {
    const { productsParchases } = this.state

    return(
      <div style={{marginTop: '-15%'}}>
        <h3 style={{textAlign: 'center'}}>Tus compras</h3>
          {this.getProductsPurchases()}
          <List
              style={{marginLeft: '1%'}} 
              itemLayout="horizontal"
              dataSource={productsParchases}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={this.getPhoto(item.id)} />}
                    title={` ${item.name} | ${item.brand} | $${item.price}` }
                    description={`Description: ${item.description}`}
                  />
                </List.Item>
              )}
            />
      </div>
    )
  }
}

const mapStateToProps = state =>({
    purchases: getVisiblePurchases(state.purchases),
    products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps
)(Purchases)