const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

var imageInput = document.getElementById('imageInput');
var imageInput2 = document.getElementById('imageInput2');
const menuBtn = document.querySelector("#menu-btn");
const menuLayout = document.querySelector("#menu-layout");
let pattern;
menuBtn.addEventListener("click", (e) => {
    menuLayout.classList.toggle("menu__layout--active");
});


imageInput.addEventListener('change', function (event) {
    var file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
        var reader = new FileReader();

        // Definir lo que sucede cuando el archivo se carga
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                // Limpiar el canvas antes de dibujar la nueva imagen
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                let template = cv.imread(img);
                let grayTemplate = new cv.Mat();

                cv.cvtColor(template, grayTemplate, cv.COLOR_RGBA2GRAY, 0);
                let result = new cv.Mat();

                let grayPattern = new cv.Mat();
                cv.cvtColor(pattern, grayPattern, cv.COLOR_RGBA2GRAY, 0);


                cv.matchTemplate(grayPattern, grayTemplate, result, cv.TM_CCOEFF_NORMED)

                let minMaxLoc = cv.minMaxLoc(result);
                let maxPoint = minMaxLoc.maxLoc;
                let color = new cv.Scalar(255, 0, 0, 255);
                cv.rectangle(template, maxPoint, new cv.Point(maxPoint.x + grayTemplate.cols, maxPoint.y + grayTemplate.rows), color, 2, cv.LINE_8, 0);

                cv.imshow('canvas3', template);
            };
            img.src = e.target.result; // Asignar la imagen cargada al objeto Image
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});



imageInput2.addEventListener('change', function (event) {
    var file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
        var reader = new FileReader();

        // Definir lo que sucede cuando el archivo se carga
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                // Limpiar el canvas antes de dibujar la nueva imagen
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);

                pattern = cv.imread(img);

            };
            img.src = e.target.result; // Asignar la imagen cargada al objeto Image
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});