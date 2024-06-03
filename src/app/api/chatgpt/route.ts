import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: question,
      max_tokens: 100,
    });

    const answer = completion.choices[0].message.content;
    console.log('RESPOSTA: ', answer)
    return NextResponse.json({ answer });
  } catch (error: any) {
    console.log('ERRO: ', error)
    if (error.status === 429) {
      return NextResponse.json({ error: 'You have exceeded your quota. Please try again later.' }, { status: 429 });
    } else {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
  }
}