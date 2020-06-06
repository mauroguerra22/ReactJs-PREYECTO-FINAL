import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout } from "../actions";
import { getTotal, getCartProducts, getInfoCustomer, getInfoShippingAddress, getInfoCreditCard } from "../reducers";
import { Layout, Row, Col, Spin } from'antd';
import { Redirect } from 'react-router-dom'
import ProductCart from '../components/ProductCard';
import CartDetails from '../components/CartDetails';          
import CommonSpin from '../common/Spin';


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
        if(this.props.location.state != undefined){ 
            const { product } = this.props.location.state
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
        if(this.props.location.state == undefined){           
            return this.renderRedirectToError();
        }else{    
            const { product } = this.props.location.state
            const { visible } = this.state
            const { customer, shippingAddress, creditCard } = this.props        
       return (           
            <Layout>
                {
                visible ? <CommonSpin/>
                :
                <Content className="content">
                    <p>Carrito de {customer} </p>
                    <Row>
                        <Col xs={{span: 24}} lg={{ span:6 }}>
                            <ProductCart product={product} />
                        </Col>
                        <Col xs={{span: 24}} lg={{ span:18 }}>
                            <CartDetails product={product} shippingAddress={shippingAddress} creditCard={creditCard}/>        
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
      title: PropTypes.string.isRequired,
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

