const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
var imageInput = document.getElementById('imageInput');
const menuBtn = document.querySelector("#menu-btn");
const menuLayout = document.querySelector("#menu-layout");

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

                // Dibujar la imagen en el canvas
                ctx2.clearRect(0, 0, canvas.width, canvas.height);
                ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);

                let src = cv.imread(canvas);
                let gray = new cv.Mat();
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

                // Mostrar la imagen procesada en el canvas
                cv.imshow('canvas2', gray);



                let dst = new cv.Mat();
                src = cv.imread(canvas);
                dst = new cv.Mat();
                let ksize = new cv.Size(5, 5); // Tamaño del kernel de desenfoque
                cv.blur(src, dst, ksize, new cv.Point(-1, -1), cv.BORDER_DEFAULT);
                cv.imshow('canvas3', dst);
                src.delete();
                dst.delete();


                let edges = new cv.Mat();

                cv.Canny(gray, edges, 50, 150, 3, false);
                cv.imshow('canvas4', edges)

            };
            img.src = e.target.result; // Asignar la imagen cargada al objeto Image
        };

        reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
});
