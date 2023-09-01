import React from 'react';

import "./defaulfLayout.css";
import Header from '../Header';
import Sidebar from '../Sidebar';

const DefaultLayout = ({ children }) => {
    return (
        <div className="default-container">
            <div className='default-header'>
                <Header />
            </div>
            <div className='default-wrapper'>
                <div className='dedefault-sidebar'>
                    <Sidebar />
                </div>
                <div className='default-content'>
                    {children}
                </div>

            </div>

        </div>
    )
}

export default DefaultLayout;