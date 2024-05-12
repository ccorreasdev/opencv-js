//https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Función para inicializar la cámara y capturar video continuamente
function initCamera() {
    // Obtener acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            setInterval(processFrame, 1000 / 30); // Procesar cada cuadro aproximadamente cada 33ms (aprox. 30 fps)
        })
        .catch(function (error) {
            console.error('Error al acceder a la cámara:', error);
        });

    function processFrame() {

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let frame = cv.matFromImageData(imageData);

        let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [170, 140, 10, 0]);
        let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [245, 220, 90, 255]);
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

document.addEventListener('DOMContentLoaded', initCamera);