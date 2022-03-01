DialStat = function (options) {
    var options = options || {};
    var self = this;

    self.DisplayType = {
        DialOnly: 0,
        DialAndCurrent: 1,
        DialAndCurrentAndTotal: 2
    };

    var ctx = document.createElement("canvas").getContext("2d");

    var currentValue = options.currentValue || 0;
    var totalValue = options.totalValue || 0;

    var totalColor = options.totalColor || "#ebebeb";
    var currentColor = options.currentColor || "deepskyblue";

    var displayType = options.displayType || self.DisplayType.DialAndCurrentAndTotal;

    var strokeWidth = options.strokeWidth || 2;

    var render = function () {
        var halfHeight = ctx.canvas.height / 2;
        var halfWidth = ctx.canvas.width / 2;

        var radius = halfWidth < halfHeight ? (halfWidth - 10) : (halfHeight - 10);

        var percentageToFill = currentValue / totalValue;

        ctx.lineWidth = strokeWidth;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = totalColor;
        ctx.arc(halfWidth, halfHeight, radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = currentColor;
        ctx.arc(halfWidth, halfHeight, radius, Math.PI, (percentageToFill * (2 * Math.PI)) + Math.PI);
        ctx.stroke();

        // If we need to draw the numbers, draw the numbers.
        if (displayType == self.DisplayType.DialOnly)
            return;

        var textContent = "";
        if (displayType == self.DisplayType.DialAndCurrent)
            textContent = currentValue;
        else if (displayType == self.DisplayType.DialAndCurrentAndTotal)
            textContent = currentValue + " / " + totalValue;

        ctx.fillStyle = currentColor;
        self.setFontSize(30, textContent, (radius * 1.9) - strokeWidth, 10);
        var textSize = ctx.measureText(textContent);
        ctx.fillText(textContent, halfWidth - (textSize.width / 2), halfHeight + (textSize.actualBoundingBoxAscent / 2));

    };

    self.setFontSize = function(fontSize, textContent, maxWidth, minFontSize){
        ctx.font = `${fontSize}px Arial`;
        var textSize = ctx.measureText(textContent);
        if(textSize.width > maxWidth && fontSize > minFontSize)
            self.setFontSize(fontSize - 1, textContent, maxWidth, minFontSize);
    }

    self.appendTo = function (elementSelector) {
        var parent = document.querySelector(elementSelector);
        if (parent == null) {
            console.error("Could not find element with selector: " + elementSelector);
            return;
        }
        parent.appendChild(ctx.canvas);
        render();
    };

    self.updateCurrent = function (newValue) {
        currentValue = newValue;
        render();
    };
}