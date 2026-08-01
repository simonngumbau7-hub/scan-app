

const openCamera = document.querySelector("button");
const tv = document.querySelector("video");
const canvas = document.getElementById("photo") // drawing board
const captureButton = document.getElementById("capture")


/*
let stream;


openCamera.addEventListener("click", getPicture);

async function getPicture(params) {



    stream = await navigator.mediaDevices.getUserMedia({
        video:{
            facingMode : "user",
            width: 300,
            height: 300
        }
    })


    tv.srcObject = stream

    captureButton.style.display = " block"

    captureButton.addEventListener("click", capturePhoto)




    
}

let text;

async function capturePhoto(){

    // GET DRAWING PEN
    const drawer = canvas.getContext("2d")

    // MATCH CANVAS SIZE WITH VIDEO ELEMENT SIZE
    canvas.width = tv.videoWidth
    canvas.height = tv.videoHeight

    drawer.drawImage(tv, 0,0)

    

    openCamera.addEventListener("click", sendOCR);
    
    const result = await Tesseract.recognize("pore.webp", "eng")

    text = result.data.text
    console.log(text);

    stream.getTracks().forEach( track => {
        track.stop()
    });

    tv.srcObject = null;
    
    captureButton.style.display = "none"

    sendOCR()

}
*/
openCamera.addEventListener("click", sendOCR);

async function sendOCR() {

    const result = await Tesseract.recognize("paula.webp", "eng")

    let text = result.data.text

    console.log(text);
    

    const send = await fetch("/ocr", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ocr:text
        })
    })
    
}
