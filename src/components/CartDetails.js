import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Input, Button, Space } from 'antd';
import { connect } from 'react-redux'
import { checkoutCart } from '../actions'
import { getTotal } from '../reducers'
import { Link } from 'react-router-dom';
import CommonModal from '../common/Modal';

const { Group } = Radio;

export class CartDetails extends Component {
    state={
        creditCard: this.props.creditCard,
        shippingAddress: this.props.shippingAddress,
        show: false,
    }

    onWriteAddress = e =>{
        this.setState({ shippingAddress: e.target.value })
    }

    onSelectCreditCard = e =>{
        this.setState({ creditCard: e.target.value })
    }
    
    toShowModal(){
        this.setState({ show: !this.state.show })    
    }

    validateButton = () => {
        return this.state.creditCard === '' || this.state.shippingAddress === ''
    }

    render() {
        const radioStyle = { display: 'block' }
        const { shippingAddress, creditCard, show } = this.state
        const { total, checkoutCart } = this.props
        const toShowModal = this.toShowModal.bind(this);
        const showInput = true;

        return (
            <div className="cartDestails">                    
                    <p>¿En que direccion quieres recibir el producto?</p>
                        <Input name="domicilio" placeholder="Domicilio..." className="inputCartDetails" value={shippingAddress} onChange={this.onWriteAddress} allowClear/>                    
                    <p>¿Como quieres pagar?</p>
                        <Group value={creditCard} onChange={this.onSelectCreditCard}>                       
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={'visa-credito'} style={radioStyle} />
                                        <p className="typeDetails">Visa Credito</p>
                                        <Input  disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                    </Space>
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={'visa-debito'} style={radioStyle} />
                                        <p className="typeDetails">Visa Debito</p>
                                        <Input disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                    </Space>
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={'master-debito'} style={radioStyle} />
                                        <p className="typeDetails">Master Card Debito</p>
                                        <Input disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                    </Space>
                        </Group>
                        <p>Total: ${ total }</p>
                        <Link to={{
                            pathname: '/success'
                        }}> 
                            <Button className="buttonDetails" onClick={() => checkoutCart(shippingAddress, creditCard)} disabled={this.validateButton()}>Confirmar Compra</Button>  
                        </Link>                   
                        {
                            show ? <CommonModal text='Ingrese su tarjeta' showInput={showInput} setShow={toShowModal}/> : null  
                        }     
            </div>
        )
    }
}

CartDetails.propTypes = {
    total: PropTypes.string.isRequired,
    checkoutCart: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({
    total: getTotal(state)
})

export default connect(
    mapStateToProps,
    { checkoutCart }
  )(CartDetails)
