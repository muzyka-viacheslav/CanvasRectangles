var amount_of_rectangles = 5;
var rects = [];
var outputRects = [];
document.getElementById("rectangles-amount").value = amount_of_rectangles;

function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function buildRandomRectangles() {
    rects.length = 0;
    outputRects.length = 0;
    var c = document.getElementById("canvasInput");
    c.height = c.offsetHeight;
    c.width = c.offsetWidth;
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
    var nextRectLeftPosition = 0;
    var availableSpaceInCanvas = c.offsetWidth;
    var heightOfCanvas = c.offsetHeight;
    ctx.lineWidth = "1";
    for (var i = 0; i < amount_of_rectangles; i++) {
        const rectWidth = returnRandomIndex(1, availableSpaceInCanvas / (amount_of_rectangles / 3));
        const rectHeight = returnRandomIndex(1, heightOfCanvas);
        const newRectangle = new Rectangle(nextRectLeftPosition,
            heightOfCanvas - rectHeight,
            rectWidth,
            rectHeight);
        rects.push(newRectangle);
        ctx.rect(newRectangle.x, newRectangle.y, newRectangle.width, newRectangle.height);
        ctx.stroke();
        availableSpaceInCanvas = availableSpaceInCanvas - newRectangle.width;
        nextRectLeftPosition = nextRectLeftPosition + newRectangle.width;
    }
    buildOutputRectangles();
}

function buildOutputRectangles() {
    var c = document.getElementById("canvasOutput");
    c.height = c.offsetHeight;
    c.width = c.offsetWidth;
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
    ctx.lineWidth = "1";

    returnRectangleWithCurrentMinHeight(rects, 0);
    _.each(outputRects, function (rect) {
       ctx.rect(rect.x, rect.y, rect.width, rect.height);
       ctx.stroke();
    });
}

function returnRectangleWithCurrentMinHeight(viewedRects, minY) {
    if (viewedRects.length === 0) return;
    if (viewedRects.length === 1) {
        outputRects.push(new Rectangle(viewedRects[0].x, viewedRects[0].y, viewedRects[0].width, viewedRects[0].height - minY));
        return;
    } else {
        var rectWithMinHeight = _.minBy(viewedRects, function (x) {
            return x.height;
        });
        var indexOfFirstRect = viewedRects.indexOf(rectWithMinHeight);
        outputRects.push(new Rectangle(viewedRects[0].x, rectWithMinHeight.y, _.sumBy(viewedRects, function (x) {
            return x.width;
        }), rectWithMinHeight.height - minY));
        var leftSideRects = viewedRects.slice(0, indexOfFirstRect);
        var rightSideRects = viewedRects.slice(indexOfFirstRect + 1, viewedRects.length);
        returnRectangleWithCurrentMinHeight(leftSideRects, rectWithMinHeight.height);
        returnRectangleWithCurrentMinHeight(rightSideRects, rectWithMinHeight.height);
    }
}

function returnRandomIndex(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function checkIfValidAmountOfRectangles(element) {
    const value = element.value;
    if (value < 3) {
        element.value = 3;
        amount_of_rectangles = 3;
    } else {
        if (value > 30) {
            element.value = 30;
            amount_of_rectangles = 30;
        } else {
            amount_of_rectangles = value;
        }
    }
}
