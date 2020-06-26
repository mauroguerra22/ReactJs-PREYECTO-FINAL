import React, { Component } from 'react'
import { Avatar, Collapse } from 'antd';
import { getVisiblePurchases } from "../reducers/purchases";
import { getVisibleProducts } from "../reducers/product";
import { getFetchedPurchases } from "../actions";
import { connect } from "react-redux";

const { Panel } = Collapse;

class Purchases extends Component {
  getPhoto(id){
    let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
    return photo;
  }

  componentDidMount(){
    this.props.dispatch(getFetchedPurchases());
  }

  render() {
    const { products, purchases } = this.props
    return(
      <div style={{marginTop: '-15%'}}>
        <h3 style={{textAlign: 'center'}}>Tus compras</h3>
          {purchases.map(purchase =>{
            return(
              <Collapse accordion>
              <Panel header="Detalle de compra" key="1">
            {purchase.addedIds.map(p =>{
              const resultado = products.find(prod => prod.id === p);
              return(
                <div>
                  <Avatar src={this.getPhoto(resultado.id)} />
                  <p>{` ${resultado.name} | ${resultado.brand} | $${resultado.price}`}</p>
                  <p>{`Description: ${resultado.description}`}</p>
                </div>
                  )
                })}
                </Panel>
              </Collapse>
            )
          })}
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