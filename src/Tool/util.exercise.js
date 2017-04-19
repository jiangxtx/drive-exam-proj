/**
 * Created by Jiangxtx on 2016/12/26.
 */

/**
 * 通过正确答案值来计算选择的选项，适用于单选、多选
 *      如：8-A; 12-A,B; 13-A,B,D;
 * @param answerNum number 正确答案值,8-A;4-B;2-C;1-D;
 */
export const caculateChoice = (answerNum) => {
    if (typeof answerNum !== 'number') {
        console.error('caculateChoice() param should be a number!');
        return;
    }
    let ansArr = [];
    if (answerNum >= 8) {
        ansArr.push('A')
        answerNum -= 8;
    }
    if (answerNum >= 4) {
        ansArr.push('B')
        answerNum -= 4;
    }
    if (answerNum >= 2) {
        ansArr.push('C')
        answerNum -= 2;
    }
    if (answerNum >= 1) {
        ansArr.push('D')
    }
    return ansArr;
}