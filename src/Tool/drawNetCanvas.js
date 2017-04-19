/**
 * 模仿知乎登录的动态格致化背景效果图。
 *
 * 调用 drawNetCanvas() 方法时，请务必保证传进来的参数 id 对应的 DOM 节点已经生成，否则无法绘制 canvas 图像。
 * 尤其是针对诸如 react 等框架开发时，要注意这一点（react 需在 componentDidMount 中调用即可）。
 *      --Jiangxtx --2017/1/12.
 */

export function drawNetCanvas(id, canvasInfo={}) {
    //定义默认画布宽高和生成点的个数
    var WIDTH = window.innerWidth - 50,
        HEIGHT = window.innerHeight - 100,
        POINT = 38;

    let { width=WIDTH, height=HEIGHT, point=POINT } = canvasInfo;

    const canvas = document.getElementById(id);
    if (!canvas) {
        throw new Error('drawNetCanvas param:id may not transfered correctly.')
    }
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.strokeStyle = 'rgba(0,0,0,0.02)';
    context.strokeWidth = 1;
    context.fillStyle = 'rgba(0,0,0,0.05)';

    let circleArr = [];

    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line(x, y, _x, _y, o) {
        this.beginX = x;
        this.beginY = y;
        this.closeX = _x;
        this.closeY = _y;
        this.o = o;
    }

    //点：圆心xy坐标，半径，每帧移动xy的距离
    function Circle(x, y, r, moveX, moveY) {
        this.x = x, this.y = y, this.r = r, this.moveX = moveX, this.moveY = moveY;
    }

    //生成max和min之间的随机数
    function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 绘制原点
    function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
    }

    //绘制线条
    function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = 'rgba(0,0,0,' + o + ')';
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
    }

    //初始化生成原点
    function init() {
        circleArr = [];
        for (var i = 0; i < point; i++) {
            circleArr.push(drawCricle(context, num(width), num(height), num(15, 2), num(10, -10) / 40, num(10, -10) / 40));
        }
        draw();
    }

    //每帧绘制
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < point; i++) {
            drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for (var i = 0; i < point; i++) {
            for (var j = 0; j < point; j++) {
                if (i + j < point) {
                    var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                        B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                    var lineLength = Math.sqrt(A * A + B * B);
                    var C = 1 / lineLength * 7 - 0.009;
                    var lineOpacity = C > 0.03 ? 0.03 : C;
                    if (lineOpacity > 0) {
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
                    }
                }
            }
        }
    }

    //调用执行
    init();
    setInterval(function () {
        for (var i = 0; i < point; i++) {
            var cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > width)
                cir.x = 0;
            else if (cir.x < 0)
                cir.x = width;
            if (cir.y > height)
                cir.y = 0;
            else if (cir.y < 0)
                cir.y = height;
        }
        draw();
    }, 16);
}