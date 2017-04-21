import { formula_baseUrl, image_baseUrl, topic_underlineIndex } from '../Config/constants'

/**
 * 把题目内容中的公式、图片等信息解析转换为 html 展示的 DOM 形式
 * @param content
 * @return {*}
 */
function contentConvert(content) {
    if (!content) {
        return content;
    }

    if (content instanceof Array) {
        content = content.join('');
    }
    return content.replace(/(<p><\/p>|<div><\/div>)/g, "")
        .replace(/\[\/f\/(.*?)\$(.*?)\$\]/g, " <img src=\"" + formula_baseUrl + "$2\" /> ")
        .replace(/\[\/i\/\](.*?)\[\/i\/\]/g, " <img src=\"" + image_baseUrl + "/$1\"/> ");
}

/**
 * 给填空题题干的下划线添加填空序号
 * @param content 带有下划线“_____”的题干内容
 */
function convertGapUnderline(content) {
    if (!content && !content.length) {
        return content;
    }
    const arr = content.split(/_{6,}/g);    // 大于等于 6 个‘_’为填空的标识；
    let arrStr = '', length = arr.length;
    arr.forEach((item, idx) => {
        if (idx < length - 1) {
            arrStr += `${item}<span class="topicItem-gap"><span class="topicItem-gapIndex">${topic_underlineIndex[idx]}</span></span>`
        } else {
            arrStr += item;
        }
    });
    return arrStr;
}

function getQuestionTypeHead(topicType) {
    let topicTypeVal = 'select';
    switch (topicType) {
        case '计算题':
            topicTypeVal = 'caculate';
            break;
        case '应用题':
            topicTypeVal = 'apply';
            break;
        case '证明题':
            topicTypeVal = 'prove';
            break;
        default:
            topicTypeVal = 'select';
    }
    return topicTypeVal;
}

function _answer_analy_mainPart(analysis, topicType, type) {
    if (!analysis) {
        return '';
    }
    if (analysis.indexOf('<editor/>') === -1) {
        return contentConvert(analysis)
    }

    let finalStr = '';
    let validAnalyArr = analysis.split('<editor/>');
    validAnalyArr.length = validAnalyArr.length - 1;

    if (validAnalyArr.length < 2) {
        finalStr = contentConvert(analysis)
    } else {
        validAnalyArr.forEach((item, idx) => {
            const topicIdx = (topicType === '填空题') ? topic_underlineIndex[idx] : (idx + 1);

            const descpIdxStr = `第 ${topicIdx} 空${(type === 1) ? '：' : '的解析：'}`;
            finalStr += `<strong class='topicItem-analysis-index'>${descpIdxStr}</strong>${(topicType === '填空题') ? '' : '<br/>'}`;
            finalStr += contentConvert(item) + '<br/>';
        })
    }
    return finalStr;
}

function convertYourAnswer(yourAnswer='', topicType) {
    return _answer_analy_mainPart(yourAnswer, topicType, 1);
}

function convertAnalysis(analysis='', topicType) {
    return _answer_analy_mainPart(analysis, topicType, 2);
}

/**
 * 解析“计算题” &  “应用题” 中的正确答案 keysteps
 * @param value题目内容 question字段
 * @param answerbase
 * @return {*}
 */
function convertKeySteps(value, answerbase){
    var answerstr = "";

    var valueType = getQuestionTypeHead(value.type);
    if(valueType === "caculate" || valueType === "apply" || valueType === "prove"){
        var stepstrNbsp = "&nbsp;&nbsp;&nbsp;&nbsp;";
        //循环小问
        $.each(value.keysteps,function(keystepindex,keystep){
            var stepstr = "";
            if(value.keysteps.length > 1){
                stepstr = stepstrNbsp;
                answerstr += "<br/><b>第" + (keystepindex + 1) + "空:</b><br/>";
            }
            //循环解法
            $.each(keystep,function(stepsindex,steps){
                //如果有小问   缩进2个空格 没有 不缩进
                var stepsStr = "";
                if (keystep.length > 1){
                    if (answerbase != null && answerbase[keystepindex] == stepsindex)
                        answerstr += stepstr + "<b style=\"background-color: #FF6600;\">第" + (stepsindex + 1) + "解法:</b><br/>";
                    else
                        answerstr += stepstr + "<b\">第" + (stepsindex + 1) + "解法:</b><br/>";
                    stepsStr += stepstrNbsp;
                }
                //循环步骤
                $.each(steps,function(stepindex,step){
                    //如果有解法有小问   缩进 4个 空格  如果 没有 解法有小问或者 有 解法没小问  缩进 两个 空格
                    var smallStep = "";
                    if (steps.length > 1){
                        answerstr += stepstr + stepsStr + "<b>第" + (stepindex + 1 ) + "步";
                        smallStep += stepstrNbsp;
                    }
                    //循环步骤中的小步骤
                    if (valueType === "caculate" || valueType === "apply") {
                        if (steps.length > 1)
                            answerstr += ":</b><br/>";
                        if (step.step.substring(0,3) != "<p>"){
                            answerstr += "<p>" + stepstr + stepsStr + step.step + "&nbsp;&nbsp;&nbsp;&nbsp;(" + step.score + "分)</p>";
                        }
                        else{
                            answerstr += step.step.replace(/<p>/g,"<p>" + stepstr + stepsStr).replace(/(.*)<\/p>/i,"$1&nbsp;&nbsp;&nbsp;&nbsp;(" + step.score + "分)</p>");
                        }
                    }else{
                        var stepPosition = "";
                        if(step.position != null && step.position.length >= 1){
                            stepPosition += "<font color='#0099FF'>（必须"
                            $.each(step.position,function(index,val){
                                stepPosition += "第" + val + "步、";
                            });
                            stepPosition = stepPosition.substring(0 , stepPosition.length - 1) + "对,此答案才可能正确。）</font>";
                        }
                        if (steps.length > 1)
                            answerstr += stepPosition + ":</b><br/>";
                        $.each(step.step, function(i,value){
                            var position = "";
                            if(value.rules != null && value.rules.length >= 1){
                                position += "<font color='#0099FF'>（必须"
                                $.each(value.rules,function(index,val){
                                    position += "(" + val + ")、";
                                });
                                position = position.substring(0 , position.length - 1) + "对,此答案才可能正确。）</font>";
                            }
                            if(value.smallStep.substring(0,3) == "<p>"){
                                answerstr += value.smallStep.replace(/<p>/g,"<p>" + stepstr + stepsStr + smallStep + "(" + value.id + ")").replace(/(.*)<\/p>/g,"$1" + stepstrNbsp + position +"(" + value.score + "分)</p>");
                            }else{
                                answerstr += "(" + value.id + ")"+ value.smallStep +  stepstrNbsp + position +"(" + value.score + "分)</p>";
                            }
                        });
                    }
                });
            });
        });
    }

    return contentConvert(answerstr);
}

export { contentConvert, convertKeySteps, convertYourAnswer, convertAnalysis, convertGapUnderline }


