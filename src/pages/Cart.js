import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout } from "../actions";
import { 
    getTotal, 
    getCartProducts, 
    getInfoCustomer, 
    getInfoShippingAddress, 
    getInfoCreditCard 
} from "../reducers";
import { Layout, Row, Col } from'antd';
import ProductsInCart from '../components/ProductsInCart';
import CartDetails from '../components/CartDetails';          
import CommonSpin from '../common/Spin';
import { Redirect, Link } from 'react-router-dom'

const { Content } = Layout;

export class Cart extends Component {
    constructor(props){
        super(props);
        this.state  = {
            creditCard:'',
            shippingAddress:'',
            visible: true
        }
    }

    componentDidMount(){
        if(this.props.location.state !== undefined){ 
            setTimeout(() => {
                this.setState({
                visible: false,
                });
            }, 3000);
        }
    }

    renderRedirectToError = () => {
        return <Redirect to="/error"/>
    }

    render() {        
        if(this.props.location.state === undefined){           
            return this.renderRedirectToError();
        }else{    
            const { visible } = this.state
            const { customer, shippingAddress, creditCard, products } = this.props        
       return (           
            <Layout>
                {
                visible ? <CommonSpin/>
                :
                <Content className="content">
                    <p>Carrito de {customer} </p>
                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <ProductsInCart products={products} />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <CartDetails
                                shippingAddress={shippingAddress}
                                creditCard={creditCard}
                            />
                        <Link to= {{ pathname: '/home' }} className="keepShopping-link">
                            Seguir comprando
                        </Link>
                        </Col>
                    </Row>
                </Content>
                }               
            </Layout>
        )
        }
    }
}

Cart.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      //title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })).isRequired,
    total: PropTypes.string,
    checkout: PropTypes.func
  }
  
  const mapStateToProps = state => ({
    products: getCartProducts(state),
    total: getTotal(state),
    customer: getInfoCustomer(state),
    shippingAddress: getInfoShippingAddress(state),
    creditCard: getInfoCreditCard(state)
  })

  export default connect(
    mapStateToProps,
    { checkout }
  )(Cart)

