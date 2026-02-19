import { Length } from './../../client/node_modules/lightningcss/node/ast.d';
/// <reference path="../@types/express/index.d.ts" />

import * as Sentry from "@sentry/node"
import { Request, Response } from "express";
import { prisma } from "../configs/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';
import fs from 'fs'
import path from 'path';
import ai from '../configs/ai';

const loadImage = (path: string, mimeType: string) => {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString('base64'),
            mimeType
        }
    }
}
// create project
export const createProject = async (req:Request, res: Response) => {
    let tempProjectId: string;
    const { userId } = req.auth();
    let isCreditDeducted = false;
    const { 
        name = "New Project",
        aspectRatio,
        userPrompt,
        productName,
        productDescription,
        targetLength = 5
    } = req.body; 

    const images: any = req.files;

    if(images.Length < 2 || !productName) {
        return res.status(400).json({ message: 'Please upload at least 2 images'})
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if(!user || user.credits < 5) {
        return res.status(401).json({ message: "Insufficient credits"})
    } else {
        // deduct credits for image generation
        await prisma.user.update({
            where: { id: userId},
            data: {credits: { decrement: 5}}
        }).then(() => {isCreditDeducted = true})
    }

    try {
        let uploadedImages = await Promise.all(
            images.map(async(item: any)=> {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const project = await prisma.project.create({
            data: {
                name,
                userId,
                productName,
                productDescription,
                userPrompt,
                aspectRatio,
                targetLength: parseInt(targetLength),
                uploadedImages,
                isGenerating: true,
            }
        })

        tempProjectId = project.id;

        const model = 'gemini-3-pro-image-preview'

        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspectRatio || '9:16',
                imageSize: '1k'
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.OFF,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.OFF
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.OFF,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.OFF,
                },
            ]
        }

        // Image to base64 structure of ai model
        const img1base64 = loadImage(images[0].path, images[0].mimeType);
        const img2base64 = loadImage(images[1].path, images[1].mimeType);

        const prompt = {
            text: `Combine the person and product into a realistic photo. Make the person naturally hold or use the product. 
                Make lighting, shadows, scale and perspective. Make the person stand in professional studio lighting. Output
                ecommerce-quality photo realistic imagery. ${userPrompt}
            `
        }

        // Generate the image using ai model
        const response: any = await ai.models.generateContent({
            model,
            contents: [img1base64, img2base64, prompt],
            config: generationConfig,
        })

        // Check if the response in valid
        if(!response?.candidates?.[0]?.content?.parts) {
            throw new Error('Unexpected Response')
        }

        const parts = response.candidates[0].content.parts;

        let finalBuffer: Buffer | null = null

        for(const part of parts){
            if(part.inlineData) {
                finalBuffer = Buffer.from(part.inlineData.data, 'base64')
            }
        }  if(!finalBuffer) {
            throw new Error('Failed to generate image')
        }

        const base64Image = `data:image/png;base64,${finalBuffer.toString('base64')}`


    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// create user video
export const createVideo = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// get all published projects
export const getAllPublishedProjects = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// delete user project
export const deleteProject = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message })
    }
}


