import React, { Component, Fragment } from 'react'
import { Row, Col, Descriptions, Button, Tag, notification, Rate } from'antd';
import { Redirect, Link } from 'react-router-dom'
import { ShoppingCartOutlined, HeartOutlined, CreditCardOutlined } from '@ant-design/icons';
import { GlassMagnifier } from "react-image-magnifiers";
import PropTypes from 'prop-types';
import { checkoutFavorite } from '../actions'
import { connect } from 'react-redux'

export class ProductInfo extends Component {

    state = {
        value: 3,
    };

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    renderRedirectToError = () => {
        return <Redirect to="/error"/>
    }

    showMessage = product =>{
        this.openNotificationWithIcon('success', product); 
        this.props.checkoutFavorite(product);
    }

    openNotificationWithIcon = (type, product) => {
        notification[type]({
          message: 'Producto agregado a favoritos',
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
            const { name, price, id, description } = this.props.product;
            const { product, onAddToCartClicked } = this.props; 
            const { value } = this.state;  
        return (
            <Fragment>
                <Row className="descriptions-product">                       
                            <Col xs={{span:24}} lg={{span:13}} className="col-img-product-info">            
                                <GlassMagnifier className="img-product-info" imageSrc={this.getPhoto(id)}/>
                            </Col>

                            <Col xs={{span:24}} lg={{span:10}} className="descriptions-product-info">
                                <HeartOutlined style={{marginLeft: '85%', marginTop: '5%', float: 'left', color: '#0050b3' }} onClick={() => this.showMessage(product)}/>
                                <Descriptions title={name}>
                                    <Descriptions.Item>
                                        <Rate onChange={this.handleChange} value={value}/>
                                        <p style={{fontSize: 44, marginBottom: 0}}>{`$${price}`}</p>
                                        <Tag className="descriptions-product-tag" color="green">Hay stock disponible</Tag>
                                        <p><CreditCardOutlined />Pagá en hasta 12 cuotas</p>
                                        {/* <img alt="tarjetas" src={tarjetas}/> */}
                                    </Descriptions.Item>                                  
                                    {/* <Descriptions.Item></Descriptions.Item>
                                    <Descriptions.Item label="Marca">{brand}</Descriptions.Item> */}
                                </Descriptions>
                                <Descriptions>
                                </Descriptions>
                                <Descriptions title="Descripcion">
                                    <p>{description}</p>
                                </Descriptions>
                                <br/>
                                    <Link
                                        to={{
                                            pathname: '/cart/',
                                            state:{ product }
                                        }}
                                    >
                                        <Button onClick={onAddToCartClicked} className="descriptions-product-button-comprar" type="primary"><ShoppingCartOutlined />Comprar</Button>                                
                                    </Link>
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
    onAddToCartClicked: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
      
  })

  export default connect(
      mapStateToProps,
      { checkoutFavorite }
    )(ProductInfo)