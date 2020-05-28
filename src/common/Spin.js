import React from 'react'
import LoadingSpin from 'react-loading-spin';

function commonSpin() {
    return (
        <div className={'ExampleOfUsage'} style={{marginLeft: '40%', marginTop: '10%' }}>
            <LoadingSpin
                duration = '2s'
                width = '15px'
                timingFunction = 'ease-in-out'
                direction = 'alternate'
                size = '200px'
                primaryColor="#5c0011" 
            />
        </div>
    )
}

export default commonSpin
