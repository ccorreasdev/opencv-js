//https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html
const colorPicker = document.querySelector("#color-picker");
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById("slider");
const thresholdValue = document.querySelector("#threshold-value");
let selectedColorFilter = {
    "r": 217,
    "g": 176,
    "b": 51,
};
let threshold = 40;


function initCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            setInterval(processFrame, 1000 / 30);
        })
        .catch(function (error) {
            console.error('Error al acceder a la cámara:', error);
        });

    function processFrame() {

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let frame = cv.matFromImageData(imageData);

        // let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [170, 140, 10, 0]);
        // let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [245, 220, 90, 255]);

        let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [selectedColorFilter.r - threshold, selectedColorFilter.g - threshold, selectedColorFilter.b - threshold, 0]);
        let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [selectedColorFilter.r + threshold, selectedColorFilter.g + threshold, selectedColorFilter.b + threshold, 255]);
        let mask = new cv.Mat();
        cv.inRange(frame, low, high, mask);

        let result = new cv.Mat();
        cv.bitwise_and(frame, frame, result, mask);

        cv.imshow('canvas', result);

        frame.delete();
        low.delete();
        high.delete();
        mask.delete();
    }
}

function hexToRgb(hex) {
    // Eliminar el "#" del inicio si está presente
    hex = hex.replace(/^#/, '');

    // Convertir el valor hexadecimal en valores de r, g y b
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Devolver el color en formato RGB
    return {
        "r": r,
        "g": g,
        "b": b,
    };
}

document.addEventListener('DOMContentLoaded', initCamera);

colorPicker.addEventListener("change", (e) => {
    selectedColorFilter = hexToRgb(e.target.value);


    console.log(selectedColorFilter.r);
})

slider.addEventListener("input", (e) => {

    threshold = parseInt(e.target.value);
    thresholdValue.innerHTML = threshold;
})