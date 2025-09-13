import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users, clientProfiles, therapistProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, phone } = await request.json();

    // Validation
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (!['client', 'therapist'].includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        phone,
        isActive: true,
      })
      .returning();

    const userId = newUser[0].id;

    // Create role-specific profile
    if (role === 'client') {
      await db.insert(clientProfiles).values({
        userId,
        emergencyContact: '',
        emergencyPhone: '',
      });
    } else if (role === 'therapist') {
      await db.insert(therapistProfiles).values({
        userId,
        bio: '',
        specializations: [],
        isAcceptingClients: true,
      });
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: userId,
          firstName,
          lastName,
          email,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}