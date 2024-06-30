import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { word, listId } = await req.json();

  if (!word || !listId) {
    return NextResponse.json({ error: 'Word and ListID are required' }, { status: 400 });
  }

  try {
    const newWord = await prisma.word.create({
      data: {
        word,
        listId,
      },
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
