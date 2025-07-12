import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body
    
    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Mock user creation - replace with actual database logic
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff6b5b&color=fff&size=150`,
      skills: [],
      location: '',
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would:
    // 1. Hash the password
    // 2. Save user to database
    // 3. Create a session/JWT token

    const response = NextResponse.json(
      { 
        user: newUser,
        message: 'Account created successfully'
      },
      { status: 201 }
    )

    // Set session cookie
    response.cookies.set('session', `session-${newUser.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
