import { DetectDocumentTextCommand, TextractClient } from "@aws-sdk/client-textract";
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

type ResponseData = {
    message: string,
    Blocks: [] | undefined,
}

export const config = {
    api: {
      bodyParser: false, // Disable the default body parser
    },
};

export async function post(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const KEY_ID = process.env.AWS_ACCESS_ID || '';
    const SECRET_KEY = process.env.AWS_ACCESS_KEY || '';
    const REGION = process.env.AWS_REGION || 'us-east-1'; // Example default region
    
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

    if(req.method === 'POST') {
        try {
            const blob = req.body;
            console.log('blob', blob);

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
                    res.status(200).json({ message: 'Success', Blocks: data.Blocks as [] });
                    // setData(data.Blocks as []);
                }
                } catch (error) {
                console.log('err', error);
            } 
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error', Blocks: [] });
        }
    } else {
        // Respond with 405 if the method is not POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

};