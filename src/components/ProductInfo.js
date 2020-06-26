import React, { Component, Fragment } from 'react'
import { Row, Col, Descriptions, Button, Tag, notification, Rate } from'antd';
import { Redirect, Link } from 'react-router-dom'
import { ShoppingCartOutlined, HeartOutlined, CreditCardOutlined } from '@ant-design/icons';
import { GlassMagnifier } from "react-image-magnifiers";
import PropTypes from 'prop-types';
import { checkoutFavorite, getFetchedProductsFavorites } from '../actions'
import { getVisibleProductsFavorites } from "../reducers/favorite";
import { connect } from 'react-redux';
import tarjeta1 from '../assets/img/iconos-tarjetas/visa.png';
import tarjeta2 from '../assets/img/iconos-tarjetas/mastercard.png';
import tarjeta3 from '../assets/img/iconos-tarjetas/amex.png';
import { firebaseApp } from "../firebase";

const Favorites = firebaseApp.database().ref().child('favorites');

export class ProductInfo extends Component {

    state = {
        value: 3,
        favorites:[]
    };

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }
    
    renderRedirectToError = () => {
        return <Redirect to="/error"/>
    }
    
    showMessage = product =>{
        Favorites.on('value', snapshot => {
            this.setState({
                favorites: snapshot.val()
            })
          })
        const resultado = this.state.favorites.find( fav => fav.id === product.id );
        if(resultado){
            this.openNotificationWithIcon('error', product, 'El producto ya se encuentra agregado a favoritos'); 
        }else{
            this.openNotificationWithIcon('success', product, 'Producto agregado a favoritos'); 
            this.props.checkoutFavorite(product);
        }
    }
    
    openNotificationWithIcon = (type, product, message) => {
        notification[type]({
            message: message,
          description: `Product: ${product.name}, Brand: ${product.brand}`,
        });
    };

    handleChange = value => {
        this.setState({ value });
    };
    
    render() {      
        if(JSON.stringify(this.props.product) === '{}'){           
            return this.renderRedirectToError();
        }else{
            const { name, price, id, description, shippingTime } = this.props.product;
            const { product, onAddToCartClicked } = this.props; 
            const { value } = this.state;  
            return (
            <Fragment>
                <Row className="descriptions-product">                       
                            <Col xs={{span:24}} lg={{span:13}} className="col-img-product-info">            
                                <GlassMagnifier className="img-product-info" imageSrc={this.getPhoto(id)}/>
                            </Col>

                            <Col xs={{span:24}} lg={{span:10}} className="descriptions-product-info">
                                <Descriptions title={name}>
                                    <Descriptions.Item>
                                        <Rate onChange={this.handleChange} value={value}/>
                                        <p style={{fontSize: 44, marginBottom: 0}}>{`$${price}`}</p>
                                        <Tag className="descriptions-product-tag" color="green">Hay stock disponible</Tag>
                                        <p><CreditCardOutlined /> Pagá en hasta 12 cuotas</p>
                                        <img alt="tarjetas1" src={tarjeta1}/>
                                        <img alt="tarjetas2" src={tarjeta2}/>
                                        <img alt="tarjetas3" src={tarjeta3}/>
                                        <p style={{marginTop: 10}}>Llega a tu casa en <strong>{shippingTime}</strong></p>
                                        <HeartOutlined className="icon-product-info" onClick={() => this.showMessage(product)}/>
                                    </Descriptions.Item>                                  
                                </Descriptions>
                                <Descriptions>
                                </Descriptions>
                                <Descriptions title="Descripcion">
                                    <Descriptions.Item>
                                        <p className="descriptions-product-info-descriptions">{description}</p>
                                    </Descriptions.Item>
                                </Descriptions>
                                    <Link
                                        to={{
                                            pathname: '/cart/',
                                            state:{ product }
                                        }}>
                                        <Button onClick={onAddToCartClicked} className="descriptions-product-button-comprar" type="primary"><ShoppingCartOutlined />Comprar</Button>                                
                                    </Link>
                                <br/>
                            </Col>
                </Row>
            </Fragment>
        )
         }  
    }
}

ProductInfo.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      shippingTime: PropTypes.string.isRequired,
    }),
    onAddToCartClicked: PropTypes.func.isRequired,
    checkoutFavorite: PropTypes.func.isRequired
  }

  const mapStateToProps = state => ({
    favorites: getVisibleProductsFavorites(state.favorites)
  })

  export default connect(
      mapStateToProps,
      { checkoutFavorite, getFetchedProductsFavorites }
    )(ProductInfo)