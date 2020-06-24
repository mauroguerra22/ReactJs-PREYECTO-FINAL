import React, { Component, Fragment } from 'react'
import { Row, Col, Descriptions, Button, Tag } from'antd';
import { Redirect, Link } from 'react-router-dom'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { GlassMagnifier } from "react-image-magnifiers";
import PropTypes from 'prop-types';
import { checkoutFavorite } from '../actions'
import { connect } from 'react-redux'

export class ProductInfo extends Component {

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    renderRedirectToError = () => {
        return <Redirect to="/error"/>
    }

    render() {      
         if(JSON.stringify(this.props.product) === '{}'){           
             return this.renderRedirectToError();
         }else{
            const { name, brand, price, id, description } = this.props.product;
            const { product, onAddToCartClicked, checkoutFavorite } = this.props;   
        return (
            <Fragment>
                <Row gutter={[48, 8]} className="descriptions-product">                       
                            <Col xs={{span:24}} lg={{span:13}} className="col-img-product-info">            
                                <GlassMagnifier className="img-product-info" imageSrc={this.getPhoto(id)}/>
                            </Col>

                            <Col xs={{span:24}} lg={{span:10}}>
                                <HeartOutlined style={{marginLeft: '100%', marginTop: '5%', float: 'left', color: '#0050b3' }} onClick={() => checkoutFavorite(product)}/>
                                <Descriptions className="descriptions-product-name" title={name}>
                                    <Descriptions.Item label="Marca">{brand}</Descriptions.Item>
                                    <Descriptions.Item label="Precio">{`$${price}`}</Descriptions.Item>
                                    {/* <Descriptions.Item><HeartOutlined twoToneColor="#eb2f96" onClick={() => console.log("fav")}/></Descriptions.Item> */}
                                </Descriptions>
                                <Descriptions  className="descriptions-product-descriptions" title="Descripcion">
                                    <p>{description}</p>
                                </Descriptions>
                                <Tag className="descriptions-product-tag" color="green">Hay stock disponible</Tag>
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