import React from 'react'
import { Layout, Tag, Row, Col } from'antd';
import {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;

function commonFooter() {
    return (
            <Footer className="footer">
                <Row>
                <div>
                    E-Commerce
                </div>
                <Col className="footer-tag">
                    <a href="https://twitter.com/95CrisMartinez"><Tag icon={<TwitterOutlined />} color="#55acee">
                        Twitter
                    </Tag></a>
                    <a href="https://www.youtube.com/"><Tag icon={<YoutubeOutlined />} color="#cd201f">
                        Youtube
                    </Tag></a>
                    <a href="https://www.facebook.com/cristian.martinez.140"><Tag icon={<FacebookOutlined />} color="#3b5999">
                        Facebook
                    </Tag></a>
                    <a href="https://www.linkedin.com/in/cristian-martinez-40a80417b/"><Tag icon={<LinkedinOutlined />} color="#55acee">
                        LinkedIn
                    </Tag></a>
                </Col>
                <Col>
                    <div>
                        © 2020 E-Commerce Argentina S.R.L.
                    </div>
                </Col>
                </Row>              
            </Footer>
    )
}

export default commonFooter
