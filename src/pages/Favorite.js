import React, { Component } from 'react'
import { List, Avatar } from 'antd';
import { getVisibleProductsFavorites } from "../reducers/favorite";
import { getFetchedProductsFavorites } from "../actions";
import { connect } from "react-redux";

class Favorite extends Component {
  getPhoto(id){
    let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
    return photo;
  }

  componentDidMount(){
    this.props.dispatch(getFetchedProductsFavorites());
  }

  render() {
    const { favorites } = this.props;
    return(
      <div style={{marginTop: '-15%'}}>
        <h3 style={{textAlign: 'center'}}>Lista de favoritos</h3>
          <List
              style={{marginLeft: '1%'}} 
              itemLayout="horizontal"
              dataSource={favorites}
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
  favorites: getVisibleProductsFavorites(state.favorites)
})

export default connect(
  mapStateToProps
)(Favorite)