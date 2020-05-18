import React, { Component } from 'react'
import ProductCard from './ProductCard';
import CommonCarousel from '../common/Carousel';
import { Layout, Row, Col } from'antd';

const { Content } = Layout;

export class Main extends Component {
    render() {
        const { products } = this.props;
        return (
            <Layout>               
                <CommonCarousel/>
                <Content className="content">
                    <p>Relacionado con tus visitas</p>
                    <Row>
                    {products.map(prod =>(
                        <Col key={prod.id} xs={{span:2}} lg={{span:6}}>
                            <ProductCard product={prod}/>
                        </Col>
                    ))}                   
                    </Row>
                </Content>
            </Layout>           
        );
    }
}

export default Main
