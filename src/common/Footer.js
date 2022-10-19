import React from 'react'
import { Layout, Tag, Row, Col } from'antd';
import {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
//className="footer-tag"
function commonFooter() {
    return (
            <Footer className="footer">
                <Row>
                    <Col xs={{span:24}} lg={{span:8}}>
                        <div>
                            E-Commerce
                        </div>
                        <div>
                            © 2022 E-Commerce Argentina S.R.L.
                        </div>
                    </Col>
                    <Col xs={{span:24}} lg={{span:8}}>

                    </Col>
                    <Col xs={{span:24}} lg={{span:8}}>
                        <a href=""><Tag icon={<TwitterOutlined />} color="#55acee">
                            Twitter
                        </Tag></a>
                        <a href="https://www.youtube.com/"><Tag icon={<YoutubeOutlined />} color="#cd201f">
                            Youtube
                        </Tag></a>
                        <a href=""><Tag icon={<FacebookOutlined />} color="#3b5999">
                            Facebook
                        </Tag></a>
                        <a href=""><Tag icon={<LinkedinOutlined />} color="#55acee">
                            LinkedIn
                        </Tag></a>    
                    </Col>
                </Row>              
            </Footer>
    )
}

export default commonFooter
