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
          const {cvc, expiry, name, number } = this.state;
          if(cvc !== '' && expiry !== '' && name !== '' && number !== ''){
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
        return (
            <div id="PaymentForm">
            <Row>
                <Col xs={{span: 24}} lg={{ span:6 }}>      
                    <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                    />               
                </Col>
                <Col xs={{span: 24}} lg={{ span:18 }}>
                    <Form 
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        style={{marginLeft: '50%'}}
                        >
                    <Form.Item
                        style={{marginBottom: '1%',marginTop: '1%'}}
                        name="number"
                        // rules={[{ required: true, message: 'Por favor complete este campo!' }]}
                    >
                        <Input
                        style={{borderRadius: 7, width: '150%'}}
                        type="tel"
                        name="number"
                        placeholder="Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{marginBottom: '1%'}}
                        name="name"
                        // rules={[{ required: true, message: 'Por favor complete este campo!' }]}
                    >
                        <Input
                        style={{borderRadius: 7, width: '150%'}}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{marginBottom: '1%'}}
                        name="expiry"
                        // rules={[{ required: true, message: 'Por favor complete este campo!' }]}
                    >
                        <Input
                        style={{borderRadius: 7}}
                        type="text"
                        name="expiry"
                        placeholder="Expiry"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{marginBottom: '1%'}}
                        name="cvc"
                        // rules={[{ required: true, message: 'Por favor complete este campo!' }]}
                    >
                        <Input
                        style={{width: '48%', borderRadius: 7, marginLeft: '102%', marginTop: '-42%', float: 'left'}}
                        type="tel"
                        name="cvc"
                        placeholder="Cvc"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{marginTop: '-7%',marginBottom:'-3%',marginLeft: '86%'}}
                    >
                        {
                            this.props.inModal ? 
                            <div style={{ display: 'inline-flex', flexDirection: 'row', float: 'left', marginLeft: '-914%'}}>
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
