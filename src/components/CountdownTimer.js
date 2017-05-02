/**
 * 该组件用于 DataTable 的列表展示，集成 antd 的 Table 组件，方便后续统一维护。
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon, Card } from 'antd'

import '../../lib/counterdownTimer/style.css'

export default class extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        $(function() {
            var currentDate = new Date();
            var endDate = new Date(currentDate.getTime() + 45*60*1000 - 1000);

            $('.countdown.styled').countdown({
                date: endDate,
                render: function(data) {
                    $(this.el).html(
                        "<div>" +
                        // this.leadingZeros(data.years, 4) +
                        // " <span>years</span></div><div>" + this.leadingZeros(data.days, 3) +
                        // " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) +
                        // " <span>hrs</span></div><div>" +
                        this.leadingZeros(data.min, 2) + ' : ' +
                        // " <span>分</span></div><div>" +
                        this.leadingZeros(data.sec, 2) +
                        // " <span>秒</span>" +
                        "</div>"
                    );
                },
                onEnd: function () {
                    $(this.el).addClass('ended');
                    alert('时间到！')
                }
            });

        });
    }

    render() {
        return (
            <Card title="计时器" className="countdown-wrap">
                {/*<span className="countdown-wrap-title">计时器</span>*/}
                <div className="countdown styled"></div>
            </Card>
        )
    }
}