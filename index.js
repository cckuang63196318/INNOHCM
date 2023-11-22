
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let image = document.getElementById("source");
let result = document.getElementById("result");

let worker = null;
let videoWidth = window.innerWidth;
let videoHeight = 0;
let streaming = false;
let cameraList = [];
let defaultCamera = -1;
let currCamera = -1;


video.setAttribute("width", videoWidth);
//video.setAttribute("height", 400);

//canvas.setAttribute("width", videoWidth);
//canvas.setAttribute("height", 400);

//image.setAttribute("width", videoWidth);
//image.setAttribute("height", 400);

const rectangles = [
  {
    left: 0,
    top: 0,
    width: 3840,
    height: 2160,
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

video.addEventListener(
    "canplay",
    (ev) => {
      if (!streaming) {
        videoHeight = (video.videoHeight / video.videoWidth) * videoWidth;
  
        //video.setAttribute("width", width);
        video.setAttribute("height", videoHeight);

        canvas.setAttribute("width", video.videoWidth);
        canvas.setAttribute("height", video.videoHeight);

        image.setAttribute("width", video.videoWidth);
        image.setAttribute("height", videoHeight);

        streaming = true;
      }
    },
    false,
);

(async () => {
    console.time();
    //const values = [];

    worker = await Tesseract.createWorker('chi_tra+eng');
    /*
    await worker.setParameters({
        tessedit_char_whitelist: '',
    });
    */
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
    await cameraDeviceList();
    cameraInitial();

    console.timeEnd();
    //await worker.terminate();
})();

async function ocrClick() {

    result.innerText = "Camera OCR Parsing...";

    // canvas
    const context = canvas.getContext("2d");

    //context.drawImage(video, 0, 0, videoWidth, videoHeight);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const data = canvas.toDataURL("image/jpeg", 1.0);
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

function cameraInitial() {

    let str = ''
    let constraints = null
    cameraList.forEach(item => {
        str = str + `${item.label},`
    })
    result.innerText = `Device:(${currCamera})\n${str}`;

    if(currCamera < 0) {
        constraints = { video: {facingMode: { exact: "environment" }} }
    } else {
        constraints = { video: { deviceId: { exact: cameraList[currCamera].deviceId } } }
    }

    console.log('deviceId:', cameraList[currCamera].deviceId)
    navigator.mediaDevices
    //.getUserMedia({ video: {facingMode: { exact: "environment" }} })
    .getUserMedia( constraints )
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
        result.innerText = `An error occurred: ${err}\nDevice:(${currCamera})\n${cameraList[currCamera].deviceId}\n${cameraList[currCamera].label}`
    });
}

async function cameraDeviceList() {
    let devices = (await navigator.mediaDevices.enumerateDevices())
    .filter(({ kind }) => kind === 'videoinput')

    for(let idx=0; idx < devices.length; idx++) {
        if(devices[idx].label.indexOf('back') > -1) {
            cameraList.push({key: idx, label: `Camera${idx+1} (Back)`, deviceId:`${devices[idx].deviceId}`})
            if(defaultCamera < 0) {
                defaultCamera = idx
                currCamera = idx
            }
        } else if(devices[idx].label.indexOf('front') > -1) {
            cameraList.push({key: idx, label: `Camera${idx+1} (Front)`, deviceId:`${devices[idx].deviceId}`})
        } else {
            cameraList.push({key: idx, label: `Camera${idx+1} (Normal)`, deviceId:`${devices[idx].deviceId}`})
        }
    }
}

function cameraSwitch() {
    if(currCamera < 0) {
        return
    }
    currCamera = currCamera + 1
    if(currCamera >= cameraList.length) {
        currCamera = defaultCamera
    }
    
    video.pause();
    video.srcObject.getTracks()[0].stop();
    video.srcObject = null;

    cameraInitial()
}

const inputElement = document.getElementById("myfile");
inputElement.addEventListener("change", handleFiles, false);

async function handleFiles() {
    result.innerText = "File OCR Parsing...";
    try {
        const selectedFile = inputElement.files[0];
        image.src = window.URL.createObjectURL(selectedFile);
        console.log('path:', selectedFile)
        const { data: { text } } = await worker.recognize(image);
        result.innerText = text;
    } catch(err) {
        result.innerText = err;
    }

}

