
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let image = document.getElementById("source");
let result = document.getElementById("result");
let worker = null;
let videoWidth = window.innerWidth;
let videoHeight = 0;
let streaming = false;


video.setAttribute("width", videoWidth);
//video.setAttribute("height", 400);

canvas.setAttribute("width", videoWidth);
//canvas.setAttribute("height", 400);

image.setAttribute("width", videoWidth);
//image.setAttribute("height", 400);

const rectangles = [
  {
    left: 0,
    top: 0,
    width: 1600,
    height: 600,
  },
  /*
  {
    left: 500,
    top: 300,
    width: 500,
    height: 250,
  },
  */
];

cametaInitial();

video.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        videoHeight = (video.videoHeight / video.videoWidth) * videoWidth;
  
        //video.setAttribute("width", width);
        video.setAttribute("height", videoHeight);
        //canvas.setAttribute("width", width);
        canvas.setAttribute("height", videoHeight);

        image.setAttribute("height", videoHeight);

        streaming = true;
      }
    },
    false,
);

(async () => {
    console.time();
    //const values = [];

    worker = await Tesseract.createWorker('chi_tra');
    await worker.setParameters({
        tessedit_char_whitelist: '',
    });
    /*
    for (let i = 0; i < rectangles.length; i++) {
        const { data: { text } } = await worker.recognize(image, { rectangle: rectangles[i] });
        values.push(text);
        console.log(`Rect ${i}:`,text);
    }
    */
    /*
    const { data: { text } } = await worker.recognize('en_zh.png');
    console.log(text);
    */
    console.timeEnd();
    //await worker.terminate();
})();

async function cameraClick() {
    // canvas
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    const data = canvas.toDataURL("image/png");
    image.setAttribute("src", data);
    //image.setAttribute("src", "01.png");

    const values = [];
    for (let i = 0; i < rectangles.length; i++) {
        //const { data: { text } } = await worker.recognize(image, { rectangle: rectangles[i] });
        const { data: { text } } = await worker.recognize(image);
        values.push(text);
        result.innerText = text;
        console.log(`Rect ${i}:`,text);
    }
}

function cametaInitial() {
    navigator.mediaDevices
    .getUserMedia({ video: {facingMode: { exact: "environment" }} })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });
}

