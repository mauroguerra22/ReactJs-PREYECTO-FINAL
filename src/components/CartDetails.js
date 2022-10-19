import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Input, Button, Space } from 'antd';
import { connect } from 'react-redux'
import { checkoutCart } from '../actions'
import { getTotal } from '../reducers'
import { Link } from 'react-router-dom';
import CommonModal from '../common/Modal';
import { firebaseApp } from '../firebase';

const { Group } = Radio;

export class CartDetails extends Component {
    state={
        creditCard: this.props.creditCard,
        shippingAddress: this.props.shippingAddress,
        show: false,
        valueCredito:'visa-credito',
        valueDebito:'visa-debito',
        valueMaster:'master-debito',
        valueTarjeta:'',
        valueTarjetaCredito:'',
        valueTarjetaDebito:'',
        valueTarjetaMaster:''
    }

    onWriteNumberCard = e =>{
        this.setState({ valueTarjeta: e.target.value })
        console.log(this.state.valueTarjeta);
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

    validateButtonDebito = () =>{
        var opcion = this.state.creditCard;
        switch(opcion) {
            case 'visa-debito':
                return false
            default:
                return true;
        }
    }

    validateButtonCredito = () =>{
        var opcion = this.state.creditCard;
        switch(opcion) {
            case 'visa-credito':
                return false
            default:
                return true;
        }
    }

    validateButtonMaster = () =>{
        var opcion = this.state.creditCard;
        switch(opcion) {
            case 'master-debito':
                return false
            default:
                return true;
        }
    }

    validateValueCard = () =>{
        var value = this.state.valueTarjeta;
        switch(this.state.creditCard) {
            case 'visa-debito':
                return this.setState({ valueTarjetaDebito: value, valueTarjetaCredito:'', valueTarjetaMaster:''})
            case 'visa-credito':
                return this.setState({ valueTarjetaCredito: value,valueTarjetaDebito:'', valueTarjetaMaster:'' })
            case 'master-debito':
                return this.setState({ valueTarjetaMaster: value,valueTarjetaDebito:'',valueTarjetaCredito:'' })
            default:
                return '';
        }
    }

    render() {
        const radioStyle = { display: 'block' }
        const { shippingAddress, creditCard, show, valueCredito, valueDebito, valueMaster, valueTarjeta, valueTarjetaCredito, valueTarjetaDebito, valueTarjetaMaster } = this.state
        const { total, checkoutCart } = this.props
        const toShowModal = this.toShowModal.bind(this);
        const showInput = true;
       /*  const userName = firebaseApp.auth().currentUser.displayName; */

        return (
            <div className="cartDestails">                    
                    <p style={{marginBottom: 10}}>¿En que direccion quieres recibir el producto?</p>
                        <Input name="domicilio" placeholder="Domicilio..." className="inputCartDetails" value={shippingAddress} onChange={this.onWriteAddress} allowClear/>                    
                    <p style={{marginTop: 10, marginBottom: 10}}>¿Como quieres pagar?</p>
                        <Group value={creditCard} onChange={this.onSelectCreditCard}>                       
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={valueCredito} style={radioStyle} />
                                        <p className="typeDetails">Visa Credito</p>
                                        <Input  value={valueTarjetaCredito} disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()} disabled={this.validateButtonCredito()}>Agregar tarjeta</Button>
                                    </Space>
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={valueDebito} style={radioStyle} />
                                        <p className="typeDetails">Visa Debito</p>
                                        <Input value={valueTarjetaDebito} disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()} disabled={this.validateButtonDebito()}>Agregar tarjeta</Button>
                                    </Space>
                                    <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                        <Radio value={valueMaster} style={radioStyle} />
                                        <p className="typeDetails">Master Card Debito</p>
                                        <Input value={valueTarjetaMaster} disabled/>
                                        <Button type="link" onClick={() => this.toShowModal()} disabled={this.validateButtonMaster()}>Agregar tarjeta</Button>
                                    </Space>
                        </Group>
                        <p>Total: ${ total }</p>
                        <Link to={{
                            pathname: '/success'
                        }}> 
                            <Button className="buttonDetails" onClick={() => checkoutCart(shippingAddress, creditCard)} disabled={this.validateButton()}>Confirmar Compra</Button>  
                        </Link>                   
                        {
                            show ? <CommonModal text='Ingrese su tarjeta' showInput={showInput} setShow={toShowModal} valueTarjeta={valueTarjeta} onWriteNumberCard={(e) =>this.onWriteNumberCard(e)} validateValueCard={this.validateValueCard}/> : null  
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
