https://github.com/LintangWisesa/MediaPipe-in-JavaScript/blob/master/js/face.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const fpsControl = new FPS();
const menuBtn = document.querySelector("#menu-btn");
const menuLayout = document.querySelector("#menu-layout");
const video1 = document.getElementsByClassName('input_video1')[0];

menuBtn.addEventListener("click", (e) => {
    menuLayout.classList.toggle("menu__layout--active");
});



function onResultsFace(results) {

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        results.image, 0, 0, canvas.width, canvas.height);
    if (results.detections.length > 0) {
        drawRectangle(
            ctx, results.detections[0].boundingBox,
            { color: 'blue', lineWidth: 2, fillColor: '#00000000' });
        drawLandmarks(ctx, results.detections[0].landmarks, {
            color: 'red',
            radius: 5,
        });
    }
    ctx.restore();
}

const faceDetection = new FaceDetection({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
    }
});
faceDetection.onResults(onResultsFace);

const camera = new Camera(video1, {
    onFrame: async () => {
        await faceDetection.send({ image: video1 });
    },
    width: 480,
    height: 480
});
camera.start();