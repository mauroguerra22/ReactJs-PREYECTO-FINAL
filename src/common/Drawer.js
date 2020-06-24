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
      const { text, show } = this.props;
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
              <Button onClick={this.onClose} type="primary">
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
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter password' }]}
                >
                   <Input.Password placeholder="Please enter user password" style={{ width: '100%' }}/>
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
                  <Input placeholder="Please enter user home" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[{ required: true, message: 'Please choose the E-mail' }]}
                >
                  <Input placeholder="Please enter user E-mail" />
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