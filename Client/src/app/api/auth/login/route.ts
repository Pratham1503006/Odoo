import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Mock authentication - replace with real database lookup and password verification
    const mockUsers = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@skillswap.com',
        password: 'demo123', // In real app, this would be hashed
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
        skills: ['React', 'TypeScript', 'UI/UX Design'],
        location: 'New York, NY',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@skillswap.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e8?w=150&h=150&fit=crop&crop=faces',
        skills: ['Python', 'Data Science', 'Machine Learning'],
        location: 'San Francisco, CA',
      }
    ]

    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    const userResponse = {
      ...userWithoutPassword,
      createdAt: new Date().toISOString(),
    }

    // Create session
    const response = NextResponse.json(
      { 
        user: userResponse,
        message: 'Logged in successfully'
      },
      { status: 200 }
    )

    // Set session cookie
    response.cookies.set('session', `session-${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
