import React, { Component } from 'react'
import { Radio, Input, Button, Space, Form } from 'antd';
import CommonModal from '../common/Modal';
import { Link } from 'react-router-dom'

const { Group } = Radio;

export class CartDetails extends Component {
    state={
        creditCard:'',
        shippingAddress:'',
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }

    render() {
        const toShowModal = this.toShowModal.bind(this);
        const handleChange = this.handleChange.bind(this);
        const { creditCard, shippingAddress, show } = this.state
        const{ product, updateCart } = this.props
        const radioStyle = { display: 'block' }
        const showInput = true;

        return (
            <div className="cartDestails">
                    <p>¿En que direccion quieres recibir el producto?</p>
                    <Input name="domicilio" placeholder="Domicilio..." className="inputCartDetails" value={shippingAddress} onChange={this.onWriteAddress} allowClear/>                    
                    <p>¿Como quieres pagar?</p>
                    <Group value={creditCard} onChange={this.onSelectCreditCard}>                       
                                <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                    <Radio value='visacredito' style={radioStyle} />
                                    <p className="typeDetails">Visa Credito</p>
                                    <Input  disabled/>
                                    <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                </Space>
                                <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                    <Radio value='visadebito' style={radioStyle} />
                                    <p className="typeDetails">Visa Debito</p>
                                    <Input disabled/>
                                    <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                </Space>
                                <Space align="center" style={{ border: '1px solid #f0f0f0', padding: 20, width: '100%' }}>
                                    <Radio value='mastercard' style={radioStyle} />
                                    <p className="typeDetails">Master Card Debito</p>
                                    <Input disabled/>
                                    <Button type="link" onClick={() => this.toShowModal()}>Agregar tarjeta</Button>
                                </Space>
                    </Group>
                        {
                            shippingAddress !='' && creditCard != '' ?
                            <Link to={{
                                pathname: '/success/'
                            }}> 
                            <Button className="buttonDetails" onClick={() => {}}>Confirmar Compra</Button>  
                            </Link> : null
                        }
                        
                        {
                        show ? <CommonModal text='Ingrese su tarjeta' showInput={showInput} setShow={toShowModal} handleChange={handleChange}/> : null  
                        }     
            </div>
        )
    }
}

export default CartDetails
