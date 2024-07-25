
import { useState } from 'react';
import { DetectDocumentTextCommand, TextractClient } from "@aws-sdk/client-textract";

export default async function readPic(image: string, setData: any) {
    const KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_ID || '';
    const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '';
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'; 
    
    if (!KEY_ID || !SECRET_KEY || !REGION) {
        throw new Error("AWS configuration environment variables are not defined");
    }

    const client = new TextractClient({
        region: REGION,
        credentials: {
            accessKeyId: KEY_ID,
            secretAccessKey: SECRET_KEY,
        },
    });

    // convert image to byte Uint8Array base 64
    const blob = Buffer.from(image.split(',')[1], 'base64');

    const params = {
        Document: {
            Bytes: blob,
        },
        FeatureTypes: ['TABLES', 'FORMS'],
    };

    const command = new DetectDocumentTextCommand(params);
    try {
        const data = await client.send(command);
        if (data?.Blocks) {
            const blocks = data.Blocks
            const textArr = blocks.filter(block => block.BlockType === "LINE").map(line => line.Text)
            setData(textArr);
        }
    } catch (error) {
        console.log('err', error);
        // error handling.
    } 
}
