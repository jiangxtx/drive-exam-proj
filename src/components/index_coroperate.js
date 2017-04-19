import React,{ Component } from 'react'
import '../css/home/index_coroperate.css'
import {Row,Col} from 'antd'
import CoroperateItem from './index_corop_item'

import item0_0 from '../img/4logos/moocassociationdefault.png'
import item0_1 from '../img/4logos/moocassociationhover.png'
import item1_0 from '../img/4logos/ecnumoocdefault.png'
import item1_1 from '../img/4logos/ecnumoochover.png'
import item2_0 from '../img/4logos/c20steamdefault.png'
import item2_1 from '../img/4logos/c20steamhover.png'
import item3_0 from '../img/4logos/examinstitutiondefault.png'
import item3_1 from '../img/4logos/examinstitutionhover.png'

class IndexCoroperate extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="coroperate">
                <div style={{fontSize:'24',textAlign:'center',margin:'10px', color:'#fff'}}>合作伙伴</div>
                <Row>
                    <Col span={16} offset={4}>
                        <Row type="flex" justify="space-around">
                            <Col span={4}><CoroperateItem item={[item0_0, item0_1]} /></Col>
                            <Col span={4}><CoroperateItem item={[item1_0, item1_1]} /></Col>
                            <Col span={4}><CoroperateItem item={[item2_0, item2_1]} /></Col>
                            <Col span={4}><CoroperateItem item={[item3_0, item3_1]} /></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default IndexCoroperate