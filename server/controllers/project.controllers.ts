import { Length } from './../../client/node_modules/lightningcss/node/ast.d';
/// <reference path="../@types/express/index.d.ts" />

import * as Sentry from "@sentry/node"
import { Request, Response } from "express";
import { prisma } from "../configs/prisma";
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


