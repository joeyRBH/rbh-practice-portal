import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { messages, users } from '@/lib/db/schema';
import { eq, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unread') === 'true';

    let whereCondition = or(
      eq(messages.senderId, session.user.id),
      eq(messages.recipientId, session.user.id)
    );

    if (unreadOnly) {
      whereCondition = and(
        whereCondition,
        eq(messages.recipientId, session.user.id),
        eq(messages.isRead, false)
      );
    }

    const results = await db
      .select({
        id: messages.id,
        subject: messages.subject,
        content: messages.content,
        isRead: messages.isRead,
        createdAt: messages.createdAt,
        senderName: users.firstName,
        senderId: messages.senderId,
        recipientId: messages.recipientId,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(whereCondition)
      .orderBy(desc(messages.createdAt))
      .limit(limit);

    return NextResponse.json({
      messages: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { recipientId, subject, content } = await request.json();

    // Validation
    if (!recipientId || !subject || !content) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify recipient exists
    const recipient = await db
      .select()
      .from(users)
      .where(eq(users.id, recipientId))
      .limit(1);

    if (recipient.length === 0) {
      return NextResponse.json(
        { message: 'Recipient not found' },
        { status: 404 }
      );
    }

    // Create message
    const newMessage = await db
      .insert(messages)
      .values({
        senderId: session.user.id,
        recipientId,
        subject,
        content,
        isRead: false,
        isEncrypted: true,
      })
      .returning();

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        messageData: newMessage[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}