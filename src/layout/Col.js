import React, { PropTypes } from 'react'

const Col = (props) => {
    let { xs, sm, md, lg, span, className } = props;
    if (!(xs || sm || md || lg)) {
        xs = 12;
    }
    if (span) {
        xs = sm = md = lg = span;
    }
    const colClass = [];
    className && colClass.push(className);

    const colKey = ['xs', 'sm', 'md', 'lg'];
    [ xs, sm, md, lg ].forEach((item, idx) => (item && colClass.push(`col-${colKey[idx]}-${item}`)));

    return (
        <div className={colClass.join(' ')}>
            { props.children }
        </div>
    )
}
Col.propTypes = {
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    className: PropTypes.string,
}

export default Col