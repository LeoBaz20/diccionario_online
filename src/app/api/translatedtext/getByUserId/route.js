import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authConfig } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const translations = await prisma.savedTranslation.findMany({
      where: { userId }
    });


    return NextResponse.json(translations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
