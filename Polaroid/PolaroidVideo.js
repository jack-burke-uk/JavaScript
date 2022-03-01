PolaroidVideo = new function () {
    var self = this;
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.translate(0.5, 0.5);
    self.canvasClickEvent = function (e) { };
    var video = null;
    var videoHeightRatio = 0;
    var videoWidth = 300; // window.innerWidth * 0.3;
    var videoHeight = 0;
    var newImagePos = {
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2
    }
    var variationAllowed = 0;

    var directions = {
        "up": 0,
        "left": 1,
        "right": 2,
        "down": 3,
        "none": 4,
    };
    var moveDirection = directions.none;
    self.setDirection = function (direction) {
        direction = direction.toLowerCase();
        if (directions.hasOwnProperty(direction))
            moveDirection = directions[direction];
        else
            console.log("Direction not valid: " + direction);
    }

    var frame = 0;

    var play = false;
    self.togglePlay = function () {
        play = !play;

        if (play) {
            console.log("Resuming the video.")
            video.play();
            render();
        }
        else {
            console.log("Pausing the video.")
            video.pause();
        }
    }

    var toggleShadow = function (showShadow) {
        ctx.shadowColor = showShadow ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)";
        ctx.shadowBlur = showShadow ? 3 : 0;
        ctx.shadowOffsetY = showShadow ? 2 : 0;
    }

    var drawPhotoTrail = function () {
        var ctxData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height); // Get image from canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas

        var x, y;

        switch (moveDirection) {
            case directions.none:
                x = 0;
                y = 0;
                break;
            case directions.up:
                x = 0;
                y = videoHeight * 0.5;
                break;
            case directions.down:
                x = 0;
                y = videoHeight * -0.5;
                break;
            case directions.left:
                x = videoWidth * 0.5;
                y = 0;
                break;
            case directions.right:
                x = videoWidth * -0.5;
                y = 0;
                break;
        }

        ctx.putImageData(ctxData, x, y); // Redraw previous image, but moved along a little
    }

    var drawNextPhoto = function () {
        var yBump = Math.floor(Math.random() * variationAllowed) - (variationAllowed / 2); // Random y axis variation
        var xBump = Math.floor(Math.random() * variationAllowed) - (variationAllowed / 2); // Random x axis variation
        var rotation = (Math.floor(Math.random() * 20) - 10) * (Math.PI / 180);
        // Draw latest polaroid
        ctx.save();
        ctx.translate((ctx.canvas.width / 2) + xBump, (ctx.canvas.height / 2) + yBump);
        ctx.rotate(rotation);
        toggleShadow(true);
        ctx.fillStyle = "white";
        ctx.fillRect((-0.5 * videoWidth) - 10, (-0.5 * videoHeight) - 10, videoWidth + 20, videoHeight + 20);
        toggleShadow(false);
        ctx.drawImage(video, -0.5 * videoWidth, -0.5 * videoHeight, videoWidth, videoHeight);
        ctx.restore();
    }

    var render = function () {
        if (!play)
            return;


        frame++;
        if (frame % 10 == 0) {
            drawPhotoTrail();
            drawNextPhoto();
        }

        window.requestAnimationFrame(render);
    }

    self.fromVideo = function (srcVideo) {
        video = srcVideo;
        video.loop = true;
        video.muted = true;
        video.playbackRate = 0.75;
        videoHeightRatio = video.videoHeight / video.videoWidth;
        videoHeight = videoWidth * videoHeightRatio;
        variationAllowed = (videoHeight * 0.1);

        var videoHyp = Math.sqrt((videoHeight * videoHeight) + (videoWidth * videoWidth));
        //ctx.canvas.height = videoHyp * 1.25;
        ctx.canvas.width = videoHyp * 4;

        // Work out where the latest image should be drawn
        newImagePos.x = ctx.canvas.width - (videoWidth * 1.15);

        video.play();
        self.togglePlay();

        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;

        // We should set the canvas to full-screen here
        ctx.canvas.addEventListener("touchstart", self.canvasClickEvent)
        document.body.appendChild(ctx.canvas);
    }
}