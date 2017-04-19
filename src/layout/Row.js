import React, { PropTypes } from 'react'

const Row = (props) => {
    let { className } = props;
    const rowClass = ['row'];
    className && rowClass.push(className);

    return (
        <div className={rowClass.join(' ')}>
            { props.children }
        </div>
    )
}
Row.propTypes = {
    className: PropTypes.string,
}

export default Row