import React, { Component, Fragment  } from 'react'
import { Redirect } from 'react-router-dom'
import { Card } from 'antd';

const { Meta } = Card;

export class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToProductInfo: false
        }
        this.findProductById = this.props.findProductById.bind(this);
    }

    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    renderRedirectProductInfo = (id) => {
        if (this.state.redirectToProductInfo) {
           return <Redirect to={`/products/${id}`}/>
        }
    }

    setRedirectToProductInfo = (id) => {
        this.setState({
            redirectToProductInfo: true
        })
        this.props.findProductById(id);
    }

    render() {
        const { name, brand, price, id } = this.props.product;
        return (            
            <Fragment>
                {this.renderRedirectProductInfo(id)}
                <Card 
                    hoverable
                    onClick={()=>this.setRedirectToProductInfo(id)}
                    style={{ margin: 20, padding: 2, width: 260, height: 260, float: 'left', border: '1px solid #f0f0f0'}}
                    cover={<img style={{width: 255,height: 160, border: '1px solid #f0f0f0'}} src={this.getPhoto(id)} />}
                >
                    <Meta 
                        title={name} 
                        description={'Marca: '+brand+' | '+'Precio: $'+price}
                    />
                </Card>         
            </Fragment>
        )
    }
}

export default ProductCard


/* actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}*/