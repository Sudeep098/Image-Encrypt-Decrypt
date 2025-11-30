function xorPixel(value, mask) {
    return value ^ mask;
}

function encryptDecrypt(imgData, seed) {
    let random = new Math.seedrandom(seed);
    for (let i = 0; i < imgData.data.length; i += 4) {
        let mr = Math.floor(random() * 256);
        let mg = Math.floor(random() * 256);
        let mb = Math.floor(random() * 256);

        imgData.data[i] = xorPixel(imgData.data[i], mr);
        imgData.data[i + 1] = xorPixel(imgData.data[i + 1], mg);
        imgData.data[i + 2] = xorPixel(imgData.data[i + 2], mb);
    }
    return imgData;
}

function encryptImage() {
    const file = document.getElementById("imageInput").files[0];
    const seed = document.getElementById("seedInput").value;

    if (!file || !seed) {
        alert("Choose image and enter seed!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            let newData = encryptDecrypt(imgData, seed);
            ctx.putImageData(newData, 0, 0);

            let encryptedURL = canvas.toDataURL();

            let output = document.getElementById("output");
            output.innerHTML = `
                <p><b>Done!</b></p>
                <a href="${encryptedURL}" download="result.png">Click here to download result</a>
            `;
        };
    };
    reader.readAsDataURL(file);
}

function decryptImage() {
    encryptImage();
}

Math.seedrandom = function(seed) {
    let x = Math.sin(seed) * 10000;
    return function() { x = Math.sin(x) * 10000; return x - Math.floor(x); };
};
