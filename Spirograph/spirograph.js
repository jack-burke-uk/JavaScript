// 6 point "Spirograph" for now. Getting more configurable as we go

Spirograph = function(customOptions){
    var options = {
        points: 6,
        container: "body",
        canvasDimensions:{x: 300, y: 300}
    };

    var ctx;
    var settings;
    var points = [];

    Object.assign(options, customOptions ?? {});

    var self =  this;

    self.init = function(){
        var container = document.querySelector(options.container);
        if(!container){
            return;
        }

        ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = options.canvasDimensions.x;
        ctx.canvas.height = options.canvasDimensions.y;
        container.appendChild(ctx.canvas);

        settings = {
            cX: ctx.canvas.width / 2,
            cY: ctx.canvas.height / 2,
            radius: Math.min(ctx.canvas.width, ctx.canvas.height) * 0.45
        }

        var angleIncrement = (2 * Math.PI) / options.points;
        var angle = 0;
        for(var i = 0; i < options.points; i++){
            points.push({
                x: (Math.cos(angle) * settings.radius) + settings.cX,
                y: (Math.sin(angle) * settings.radius) + settings.cY,
                color: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
            });
            angle += angleIncrement;
        }

        render();
    }

    var render = function(){
        for(var i = 0; i < points.length; i++){
            var sourcePoint = points[i];
            ctx.strokeStyle = sourcePoint.color;

            for(var j = 0; j < points.length; j++){
                var targetPoint = points[j];
                ctx.beginPath();
                ctx.moveTo(sourcePoint.x, sourcePoint.y);
                ctx.lineTo(targetPoint.x, targetPoint.y);
                ctx.stroke();
            }

            // ctx.beginPath();
            // ctx.arc(sourcePoint.x, sourcePoint.y, 2, 0, 2 * Math.PI);
            // ctx.fill();
        }
    };
};

var spiro = new Spirograph({
    points: Math.max(Math.ceil(Math.random() * 30), 3),
    canvasDimensions: {x:500, y:500}
});
spiro.init();