import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authConfig } from '@/lib/auth';

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { inputText, translatedText, sourceLanguage, targetLanguage } = await req.json();
  const userId = session.user.id;

  if (!inputText || !translatedText || !sourceLanguage || !targetLanguage || !userId) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  try {
    const newSavedTranslation = await prisma.savedTranslation.create({
      data: {
        originalText: inputText,
        translatedText,
        sourceLanguage,
        targetLanguage,
        userId,
      },
    });
    return NextResponse.json(newSavedTranslation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
