import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import * as AWS from '@aws-sdk/client-textract';

const client = new AWS.Textract({ region: "REGION" });

// Named export for POST method
export async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error('Error parsing form:', err);
                    return res.status(500).json({ error: 'Error parsing form' });
                }

                const image = files?.file ? fs.readFileSync(files.file.path) : null;
                const params: AWS.DetectDocumentTextCommandInput = {
                    Document: {
                        Bytes: image ? new Uint8Array(image) : undefined,
                    },
                };
                try {
                    const response = await client.detectDocumentText(params);
                    // Handle response
                } catch (error) {
                    // Handle error
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}