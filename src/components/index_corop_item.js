import React,{ Component } from 'react'
import '../css/home/index_coroperate.css'


class CoroperateItem extends Component{
    constructor(props) {
        super(props);
        this.state={
            itemHover:false
        };
    }
    onItemEnterHandler(){
        this.setState({
            itemHover: true
        });
        //console.log('enter')
        //console.log(this.state)
    }
    onItemLeaveHandler(){
        this.setState({
            itemHover: false
        });
        //console.log('leave')
    }
    render(){
        //console.log(this.props.item)
        let imgSrc = this.state.itemHover?this.props.item[1]:this.props.item[0]
        return(
            <div>
                <img src={imgSrc} style={{width:'100%'}}  onMouseEnter={this.onItemEnterHandler.bind(this)}
                     onMouseLeave={this.onItemLeaveHandler.bind(this)}/>
            </div>
        )
    }
}


export default CoroperateItem