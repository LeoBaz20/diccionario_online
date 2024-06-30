import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authConfig } from '@/lib/auth';

export async function GET(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const listId = searchParams.get('id');

  if (!listId) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const list = await prisma.list.findUnique({
      where: { id: parseInt(listId, 10) },
      include: {
        _count: {
          select: {
            words: true,
          },
        },
      },
    });

    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }

    const formattedList = {
      ...list,
      wordCount: list._count.words,
    };

    return NextResponse.json(formattedList, { status: 200 });
  } catch (error) {
    console.error('Error fetching list:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
