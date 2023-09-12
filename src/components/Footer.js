import React from 'react';
import image from '../assets/images/DS.png'

const Footer = () => {
    return (
        <div className="mb-2 w-100 px-3 " >
            <hr />
            <div className="d-flex justify-content-lg-between align-items-center ">
                <div>
                    <a href="http://datasoft-bd.com/" className="text-decoration-none text-secondary" target="_blank" >
                        &copy; Powered By DataSoft Systems Bangladesh Limited
                    </a>
                </div>
                <div>
                    <a href="http://datasoft-bd.com/" target="_blank">
                        <img src={image} alt="DS logo" height="30px"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;