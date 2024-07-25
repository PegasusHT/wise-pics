import { DetectDocumentTextCommand, TextractClient } from "@aws-sdk/client-textract";
import { NextResponse, NextRequest } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import { Textract } from 'aws-sdk';

// type ResponseData = {
//     message: string,
//     Blocks: [] | undefined,
// }

export const config = {
    api: {
      bodyParser: false, // Disable the default body parser
    },
};

export async function POST(req: NextRequest, res: NextResponse) {
    const KEY_ID = process.env.AWS_ACCESS_ID || '';
    const SECRET_KEY = process.env.AWS_ACCESS_KEY || '';
    const REGION = process.env.AWS_REGION || 'us-east-1'; 
    
    if (!KEY_ID || !SECRET_KEY || !REGION) {
        throw new Error("AWS configuration environment variables are not defined");
    }
      
    const client = new Textract({
      region: REGION,
      credentials: {
        accessKeyId: KEY_ID,
        secretAccessKey: SECRET_KEY,
      },
    });
    
    
    const body=  await req.body;
    console.log(body);
    // return NextResponse.json({ message: 'End Here' }, { status: 200 });

    const imageData = body;
    const params = {
        Document: {
          Bytes: imageData,
          // Bytes: Buffer.from(imageData, 'base64').toString('binary'),
        },
        FeatureTypes: ['ALL'],
        DocumentLocation: {},
      };
    
    try {
        const data = await client.startDocumentAnalysis(params).promise();
        const jobId = data.JobId;

        return NextResponse.json({ message: 'Text extraction started successfully' }, { status: 200 });

        // res.status(200).json({ message: 'Text extraction started successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error processing image' }, { status: 500 });
        // res.status(500).json({ message: 'Error processing image' });
    }

    // const form = new formidable.IncomingForm();
    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         res.status(400).json({ message: 'Error parsing form data' });
    //         return;
    //     }

    //     const file = files.file;
    //     const buffer = file?.path;
    //     const params = {
    //         Document: {
    //             Bytes: buffer,
    //         },
    //         FeatureTypes: ['TABLES', 'FORMS'],
    //     };

    //     const command = new DetectDocumentTextCommand(params);
    //     try {
    //         const data = await client.send(command);
    //         if (data?.Blocks) {
    //             res.status(200).json({ message: 'Success', Blocks: data.Blocks as [] });
    //         }
    //     } catch (error) {
    //         console.log('err', error);
    //     }
    // });
};