duotoneGen = new function () {
    var self = this;

    // A couple of enums so that we're not passing MagicNumbers
    self.colorType = {
        Light: 0,
        Dark: 1
    };
    self.transparencyOptions = {
        NoTransparency: 0,
        DarkIsTransparent: 1,
        LightIsTransparent: 2
    }

    // Default values
    var transparencySelected = self.transparencyOptions.NoTransparency;
    var lightColor = [255, 255, 255];
    var darkColor = [0, 0, 0];

    self.setTransparency = function (value) {
        transparencySelected = value;
    }

    self.setColor = function (colorType, colorValue) {
        switch (colorType) {
            case self.colorType.Light:
                lightColor = colorValue;
                break;
            case self.colorType.Dark:
                darkColor = colorValue;
                break;
        }
    };

    // Storing these means we can reuse the same canvas to regenerate
    var bgCtx = document.createElement("canvas").getContext("2d");
    var ctx = document.createElement("canvas").getContext("2d");

    // Create the duotone image and append it to the document
    self.generate = function (img) {
        return new Promise(function (resolve) {
            bgCtx.canvas.width = img.width;
            bgCtx.canvas.height = img.height;
            bgCtx.drawImage(img, 0, 0);

            // Generate the foreground color data
            var imageData = bgCtx.getImageData(0, 0, bgCtx.canvas.width, bgCtx.canvas.height);
            var imgData = imageData.data;
            var lightIsTransparent = transparencySelected == self.transparencyOptions.LightIsTransparent;
            for (var i = 0; i < imgData.length; i += 4) {
                var avg = Math.floor((imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3);
                imgData[i] = lightIsTransparent ? darkColor[0] : lightColor[0];
                imgData[i + 1] = lightIsTransparent ? darkColor[1] : lightColor[1];
                imgData[i + 2] = lightIsTransparent ? darkColor[2] : lightColor[2];
                imgData[i + 3] = lightIsTransparent ? 255 - avg : avg;
            };
            bgCtx.putImageData(imageData, 0, 0);

            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;

            if (transparencySelected == self.transparencyOptions.NoTransparency) {
                ctx.fillStyle = "rgb(" + darkColor.join(",") + ")";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            else {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            ctx.drawImage(bgCtx.canvas, 0, 0);

            document.body.appendChild(ctx.canvas);
            resolve(ctx.canvas);
        });
    }
}