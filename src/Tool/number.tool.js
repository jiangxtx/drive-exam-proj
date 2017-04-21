/**
 * Created by Jiangxtx on 2017/3/30.
 */

function cutFloat_dot2(number) {
    if (typeof number === 'string') {
        number = parseFloat(number);
    }
    if(isNaN(number) || parseInt(number)==number)
        return number;
    else
        return number.toFixed(2);
}

export { cutFloat_dot2 }