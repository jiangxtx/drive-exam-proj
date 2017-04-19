import React, { Component, ProTypes } from 'react';

import '../css/home/index_foot.css';

class IndexFooter extends Component {
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <div className="foot">
                    <p className="foot-descp">上海智而仁课程研发中心  &copy; 沪ICP备15038486号</p>
                </div>
            </div>
        );
    }
}

export default IndexFooter