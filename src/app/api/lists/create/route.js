import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authConfig } from '@/lib/auth';

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();
  const userId = session.user.id;

  if (!name || !userId) {
    return NextResponse.json({ error: 'Nombre y UserID es necesario' }, { status: 400 });
  }

  try {
    const newList = await prisma.list.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(newList, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
