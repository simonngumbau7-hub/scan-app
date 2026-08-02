
const express = require("express")
const app = express();
const path = require("path")
const Grok = require("groq-sdk")
require("dotenv").config();

const agent = new Grok({
    apiKey : process.env.GROQ_API_KEY
})


app.use(express.json())

app.use(express.static(__dirname))

let ocr

let prompt

app.post("/ocr", (req, res)=>{
     ocr  = req.body.ocr

 async function getGrok(params) {

    prompt = `
        You are an expert at identifying skincare and
        cosmetic products from noisy OCR text.

        You will receive raw OCR text extracted from a product package.

        Your task is to reconstract the product name exactly as it would most likely appear in the
        INCI Decoder product database.

        Rules:
        -Use te official brand name
        -Use the official product line or collection name
        -Use the official product name
        -Include the product type (Cleanser, Serum, Cream, Toner, Sunscreen e.t.c)
        -Include the variant if it is part of the official name (vitamin C, Aloe vera, Hydrating, Bright Complete, etc)
        -Correct OCR Mistakes
        -Ignore ingredients, marketing claims, instructions, addresses, barcodes, batch numbers, sizes and other
        unrelated text.
        -Return the product name that is most likely to match an existing INCI Decoder produt entry.
        -If uncertain, choose the closest existing product name rather than inventing a new one.

        Return ONLY the product name. No explnations, no quotation marks, no extra text

        Here is the OCR Text : ${ocr}

        `

    const result = await sendMesage()
    const endResult = result.choices[0].message.content;
    console.log(endResult);

    res.json({name:endResult})
    
 }

 getGrok()


 async function sendMesage(params) {



    const response = await agent
        .chat
        .completions
        .create({
            model:"llama-3.3-70b-versatile",
            messages : [
                {
                    role:"user",
                    content:prompt
                }
            ]
        })

    return response;
    
}
   
 
    
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})