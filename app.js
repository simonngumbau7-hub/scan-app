

const openCameraButton = document.querySelector(".scan");
const tv = document.querySelector("video");
const canvas = document.getElementById("photo") // drawing board
const captureButton = document.getElementById("capture")
const message = document.getElementById("guide")
let stream;


                 // OPEN CAMERA

openCameraButton.addEventListener("click", openCamera)


async function openCamera(params) {
    
   try {
        
       stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode:"environment",
            width:{ ideal : 1920},
            height:{ ideal : 1080}
        }
       })

       tv.srcObject = stream

       captureButton.classList.remove("hide")

    } catch (error) {

        message.textContent = "Please allow camera access in order to scan a product"

        setInterval(()=>{
            message.textContent = " "
        }, 3000)

        
    }
    
}



                   // CAPTURE PHOTO

captureButton.addEventListener("click", capturePhoto)

async function capturePhoto(params) {

  const drawer = canvas.getContext("2d")

  canvas.width = tv.videoWidth
  canvas.height = tv.videoHeight

  drawer.drawImage(tv, 0, 0)

  captureButton.classList.add("hide")

  await sendOCR()

  closeCamera()
    
}


                    // CLOSE CAMERA

 function closeCamera(params) {

    stream.getTracks().forEach(track => {
        track.stop()
    });

    tv.srcObject = null;
    
}

            
            // READ TEXT

const productName = document.querySelector(".product-name")
    

async function sendOCR() {

    const result = await Tesseract.recognize(canvas, "eng")

    let text = result.data.text
    
    const send = await fetch("/ocr", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ocr:text
        })
    })

    const nameObj = await send.json()

    productName.textContent = nameObj.name;
    
}


