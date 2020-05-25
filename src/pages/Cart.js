import React, { Component } from 'react'
import { Layout, Row, Col } from'antd';
import ProductCart from '../components/ProductCard';
import CartDetails from '../components/CartDetails';

const { Content } = Layout;

export class Cart extends Component {
    constructor(props){
        super(props);
        this.state  = {
            creditCard:'',
            shippingAddress:''
        }
    }

    componentDidMount(){
        const { product } = this.props.location.state
        this.props.updateCart(product);
    }

    render() {
        const { product } = this.props.location.state
        const { updateCart } = this.props
        return (
            <Layout>
                <Content className="content">
                    <Row>
                        <Col xs={{span: 24}} lg={{ span:18 }}>
                            <CartDetails product={product} updateCart={updateCart}/>        
                        </Col>
                        <Col xs={{span: 24}} lg={{ span:6 }}>
                            <ProductCart product={product} />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}

export default Cart
