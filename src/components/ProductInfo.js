import React, { Component } from 'react'
import { Layout, Row, Col, Descriptions, Button, Tag } from'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { GlassMagnifier } from "react-image-magnifiers";

const { Content } = Layout;

export class ProductInfo extends Component {

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    render() {
        const { name, brand, price, id, descriptions } = this.props.product[0];
        return (
            <div>
                <Row gutter={[48, 8]} className="descriptions-product">                       
                            <Col xs={{span:13}} lg={{span:13}} className="col-img-product-info">            
                                <GlassMagnifier className="img-product-info" imageSrc={this.getPhoto(id)}/>
                            </Col>

                            <Col xs={{span:10}} lg={{span:10}}>
                                <Descriptions className="descriptions-product-name" title={name}>
                                    <Descriptions.Item label="Marca">{brand}</Descriptions.Item>
                                    <Descriptions.Item label="Precio">{"$ "+price}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions  className="descriptions-product-descriptions" title="Descripcion">
                                    <p>{descriptions}</p>
                                </Descriptions>
                                <Tag className="descriptions-product-tag" color="green">Hay stock disponible</Tag>
                                <br/>
                                <Button className="descriptions-product-button-comprar" type="primary"><ShoppingCartOutlined /> Comprar ahora</Button>
                            </Col> 
                </Row>
            </div>
        )
    }
}

export default ProductInfo