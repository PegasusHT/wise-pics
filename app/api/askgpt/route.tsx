import { FiSend } from "react-icons/fi";
import OpenAI from "openai";
import { NextResponse, NextRequest } from 'next/server';

const key= process.env.NEXT_PUBLIC_CHAT_GPT_KEY || '';
const openai = new OpenAI({
  apiKey: key, 
  dangerouslyAllowBrowser: true 
});
const GPT_MODEL = 'gpt-4o-mini-2024-07-18';

export async function POST(req: NextRequest) {
    try {
      const { question, textImg } = await req.json();
  
      if (!question || !textImg) {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
      }
  
      const questionText = `Based on the text inside the image: ${textImg}\n` + `answer this question: ${question}`;
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: questionText }],
        model: GPT_MODEL,
      });
  
      const result = completion.choices[0].message.content;
      return NextResponse.json({ answer: result }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
  }