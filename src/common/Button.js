import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { withTranslation } from 'react-i18next';

function CommonButton(props) {
    return (       
        <div>
            <Button type={props.type} danger={props.danger}>{ props.t('components.titleButton', { framework: "react-i18next" }) }</Button>
        </div>
    )
}

export default withTranslation('common')(CommonButton);