import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For now, return a mock user or null if not authenticated
    // In a real app, you would verify the session/token here
    const authHeader = request.headers.get('authorization')
    const sessionCookie = request.cookies.get('session')
    
    // Mock authentication check
    if (!authHeader && !sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Mock user data - replace with actual user fetching logic
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      skills: ['React', 'TypeScript', 'Node.js'],
      location: 'San Francisco, CA',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ user: mockUser }, { status: 200 })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle login/authentication
    // This is a mock implementation
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Mock authentication - replace with real auth logic
    if (email === 'demo@skillswap.com' && password === 'demo123') {
      const user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@skillswap.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
        skills: ['React', 'TypeScript', 'UI/UX Design'],
        location: 'New York, NY',
        createdAt: new Date().toISOString(),
      }
      
      // In a real app, you would create a session/JWT token here
      const response = NextResponse.json({ user }, { status: 200 })
      response.cookies.set('session', 'mock-session-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      
      return response
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Handle logout
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
    
    // Clear the session cookie
    response.cookies.delete('session')
    
    return response
  } catch (error) {
    console.error('Auth logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
