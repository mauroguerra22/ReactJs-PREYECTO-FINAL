import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input } from 'antd';

export class commonDrawer extends Component {
    constructor(props) {
        super(props);
          this.state = {
            visible: false
          };
      }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });

    setTimeout(() => {
        this.setState({
          visible: false
        });
      }, 2000);

      this.props.setShow();
  };

  render() {
      const { text, show, name, email, domicilio, passworduser } = this.props;
    return (
      <>    
        <Drawer
          title={text}
          width={720}
          onClose={this.onClose}
          visible={show}
          bodyStyle={{ paddingBottom: 80 }}
          keyboard={true}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary" disabled={this.props.validateButtonConfirm()}>
                Confirmar
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="User Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input value={name} placeholder="Please enter user name" onChange={this.props.onWriteName} allowClear/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="passworduser"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter password' }]}
                >
                   <Input.Password value={passworduser} placeholder="Please enter user password" style={{ width: '100%' }} onChange={this.props.onWritePasswordUser} allowClear/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="domicilio"
                  label="Domicilio"
                  rules={[{ required: true, message: 'Please enter user home' }]}
                >
                  <Input value={domicilio} placeholder="Please enter user home" onChange={this.props.onWriteDomicilio} allowClear/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[{ required: true, message: 'Please choose the E-mail' }]}
                >
                  <Input value={email} placeholder="Please enter user E-mail" onChange={this.props.onWriteEmail} allowClear/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default commonDrawer