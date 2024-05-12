//https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html
let imgElement = document.getElementById("uploaded-img");
let inputElement = document.getElementById("file-input");

async function detectColor() {

    let src = cv.imread(imgElement);
    let dst = new cv.Mat();

    //ESPACIO DE COLOR RGB
    let low = new cv.Mat(src.rows, src.cols, src.type(), [15, 135, 250, 0]);
    let high = new cv.Mat(src.rows, src.cols, src.type(), [25, 145, 255, 255]);

    cv.inRange(src, low, high, dst);

    let result = new cv.Mat();
    cv.bitwise_and(src, src, result, dst);

    cv.imshow('canvas-output', result);
    src.delete(); dst.delete(); low.delete(); high.delete();
}

inputElement.addEventListener("change", (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
});

imgElement.onload = detectColor;


// Función para inicializar la cámara y capturar video continuamente
function initCamera() {
    // Obtener el elemento de video y canvas
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // Obtener acceso a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();

            // Llamar a la función de procesamiento de cuadros continuamente
            setInterval(processFrame, 1000 / 10); // Procesar cada cuadro aproximadamente cada 33ms (aprox. 30 fps)
        })
        .catch(function (error) {
            console.error('Error al acceder a la cámara:', error);
        });

    // Función para procesar cada cuadro de video
    function processFrame() {
        // Dibujar el cuadro de video en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convertir el canvas a una imagen
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let frame = cv.matFromImageData(imageData);

        let hsv = new cv.Mat();
        let rgb = new cv.Mat();



        // let lowerColor = new cv.Scalar(85, 50, 50, 0);
        // let upperColor = new cv.Scalar(145, 255, 255, 0);

        // // let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), lowerColor); // Rango bajo de azul en HSV
        // // let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), upperColor); // Rango alto de azul en HSV

        // let dst = new cv.Mat();
        let low = new cv.Mat(frame.rows, frame.cols, frame.type(), [140, 10, 50, 0]);
        let high = new cv.Mat(frame.rows, frame.cols, frame.type(), [225, 40, 70, 255]);

        // let mask = new cv.Mat();

        // cv.inRange(hsv, low, high, dst);


        // let result = new cv.Mat();
        // cv.bitwise_and(hsv, hsv, result, dst);

        let mask = new cv.Mat();
        cv.inRange(frame, low, high, mask);

        let result = new cv.Mat();
        cv.bitwise_and(frame, frame, result, mask);

        cv.imshow('canvas', result);

        // //let src = new cv.Mat();
        // let dst = new cv.Mat();

        // // Convertir a HSV
        // cv.cvtColor(src, src, cv.COLOR_BGR2HSV);

        // let lower_white = new cv.Scalar(90, 50, 50, 0); // Matiz mínimo, saturación mínima, valor mínimo, alpha (opcional)
        // let upper_white = new cv.Scalar(130, 255, 255, 255); // Matiz máximo, saturación máxima, valor máximo, alpha (opcional)

        // // Rango de color en HSV
        // let low = new cv.Mat(src.rows, src.cols, src.type(), lower_white); // Rango bajo de azul en HSV
        // let high = new cv.Mat(src.rows, src.cols, src.type(), upper_white); // Rango alto de azul en HSV

        // let mask = new cv.Mat();
        // cv.inRange(src, low, high, mask);

        // // Aplicar la operación bitwise_and para obtener la imagen resultante
        // let result = new cv.Mat();
        // cv.bitwise_and(src, src, result, mask);

        // // Mostrar la imagen procesada en el canvas
        // cv.imshow('canvas', mask);

        frame.delete();
        hsv.delete();
        // dst.delete();
        low.delete();
        high.delete();
        mask.delete();

    }



}

// Inicializar la cámara cuando la página esté cargada
document.addEventListener('DOMContentLoaded', initCamera);