'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../hooks/use-auth'
import type { SocketEvents } from '../types'

interface SocketContextType {
  socket: Socket<SocketEvents> | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket<SocketEvents> | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize socket connection
      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        auth: {
          userId: user.id,
        },
        autoConnect: true,
      })

      socketInstance.on('connect', () => {
        console.log('Socket connected:', socketInstance.id)
        setIsConnected(true)
      })

      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected')
        setIsConnected(false)
      })

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        setIsConnected(false)
      })

      setSocket(socketInstance)

      return () => {
        socketInstance.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
    } else {
      // Disconnect socket if user is not authenticated
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
    }
  }, [isAuthenticated, user?.id])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
