import React, { Component } from 'react'
import Cards from 'react-credit-cards';
import { Form, Input, Button, Row, Col, notification } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export class PaymentForm  extends Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
      };
     
      handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
        
      }

      validateFields = () =>{
          const {cvc, expiry, name } = this.state;
          if(cvc !== '' && expiry !== '' && name !== ''){
            this.props.validateValueCard();
            this.props.handleOk();
          }else{
              this.openNotificationWithIcon('error');
          }
      }

      openNotificationWithIcon = type => {
        notification[type]({
          message: 'Error',
          description:
            'Por favor complete todos los campos!.',
        });
      };

    render() {
        const { valueTarjeta, onWriteNumberCard } = this.props
        return (
            <div id="PaymentForm" className="centerPayment">
            <Row>
                <Col xs={{span: 24}} lg={{ span:24 }}>      
                    <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={valueTarjeta}
                    />               
                </Col>
                <Col xs={{span: 24}} lg={{ span:24 }}>
                    <Form 
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        >
                    <Form.Item
                        style={{marginTop: 10}}
                        name="number">
                    <Input
                        style={{borderRadius: 7, width: '100%'}}
                        type="tel"
                        name="number"
                        value={valueTarjeta}
                        placeholder="Number"
                        onChange={onWriteNumberCard}
                        onFocus={this.handleInputFocus}/>
                    </Form.Item>
                    <Form.Item
                        name="name">
                    <Input
                        style={{borderRadius: 10}}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}/>
                    </Form.Item>
                    <Form.Item
                        name="expiry">
                    <Input
                        style={{borderRadius: 10}}
                        type="text"
                        name="expiry"
                        placeholder="Expiry"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}/>
                    </Form.Item>
                    <Form.Item
                        name="cvc">
                    <Input
                        style={{borderRadius: 10}}
                        type="tel"
                        name="cvc"
                        placeholder="Cvc"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}/>
                    </Form.Item>
                    <Form.Item>
                        {
                            this.props.inModal ? 
                            <div>
                                <Button onClick={this.props.handleCancel} style={{ marginRight: 10 }}>
                                    Cancelar
                                </Button>
                                <Button type="primary" htmlType="submit" onClick={this.validateFields}>
                                    Confirmar
                                </Button>                       
                            </div>
                            : null
                        }                       
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
      </div>
        )
    }
}

export default PaymentForm
