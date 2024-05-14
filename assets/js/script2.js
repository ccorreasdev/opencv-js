//https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html
let imgElement = document.getElementById("uploaded-img");
let inputElement = document.getElementById("file-input");

const menuBtn = document.querySelector("#menu-btn");
const menuLayout = document.querySelector("#menu-layout");

menuBtn.addEventListener("click", (e) => {
    menuLayout.classList.toggle("menu__layout--active");
});



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

