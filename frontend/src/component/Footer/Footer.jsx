import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='container_footer'>
            <div style={{ textAlign: 'center' }}>
                <p className='titleText'>Faculty Of Engineering</p>
                <p className='subTitleText'>University Of Jaffna</p>
                <p className='subTitleText2'>@Alright reserved</p>
            </div>

            <div className="vertical-line"></div>

            <div style={{ textAlign: 'center' }}>
                <p className='titleText'>Database System Project</p>
                <p className='subTitleText2'>KULATHUNGA K.M.P.S (2021/E/078)</p>
                <p className='subTitleText2'>CHANDRASIRI P.G.P.M (2021/E/108)</p>
            </div>

            <div className="vertical-line"></div>

            <div style={{ textAlign: 'center' }}>
                <p className='titleText' style={{marginLeft:'20px'}}>Contact us</p>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className='images envelop' />
                    <div className='images facebook' />
                    <div className='images instagram' />
                    <div className='images linkedin' />
                    <div className='images twitter' />
                </div>
            </div>
        </div>
    ) 
}

export default Footer