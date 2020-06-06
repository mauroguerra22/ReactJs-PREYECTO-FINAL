import React, { Component, Fragment } from 'react'
import { Row, Col, Descriptions, Button, Tag } from'antd';
import { Redirect, Link } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { GlassMagnifier } from "react-image-magnifiers";
import PropTypes from 'prop-types';

export class ProductInfo extends Component {

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    renderRedirectToError = () => {
        return <Redirect to="/error"/>
    }

    render() {      
         if(JSON.stringify(this.props.product) == '{}'){           
             return this.renderRedirectToError();
         }else{
            const { name, brand, price, id, descriptions } = this.props.product; 
            const { product, onAddToCartClicked } = this.props;    
        return (
            <Fragment>
                <Row gutter={[48, 8]} className="descriptions-product">                       
                            <Col xs={{span:24}} lg={{span:13}} className="col-img-product-info">            
                                <GlassMagnifier className="img-product-info" imageSrc={this.getPhoto(id)}/>
                            </Col>

                            <Col xs={{span:24}} lg={{span:10}}>
                                <Descriptions className="descriptions-product-name" title={name}>
                                    <Descriptions.Item label="Marca">{brand}</Descriptions.Item>
                                    <Descriptions.Item label="Precio">{`$${price}`}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions  className="descriptions-product-descriptions" title="Descripcion">
                                    <p>{descriptions}</p>
                                </Descriptions>
                                <Tag className="descriptions-product-tag" color="green">Hay stock disponible</Tag>
                                <br/>
                                    <Link
                                        to={{
                                            pathname: '/cart/',
                                            state:{ product }
                                        }}
                                    >
                                        <Button onClick={onAddToCartClicked} className="descriptions-product-button-comprar" type="primary"><ShoppingCartOutlined /> Comprar ahora</Button>                                
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
        descriptions: PropTypes.string.isRequired,
    }),
    onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductInfo