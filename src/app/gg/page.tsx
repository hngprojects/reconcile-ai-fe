'use client'

import { useEffect, useState } from 'react'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

type Notification = {
  id: number
  message: string
  timestamp: string
}

const Page = () => {
  const [echo, setEcho] = useState<Echo | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      window.Pusher = Pusher
      const echoInstance = new Echo({
        broadcaster: 'reverb',
        key: 'b6jeajexulljsjb3mtim',
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        forceTLS: true,
        wsHost: '8479-102-210-221-22.ngrok-free.app',
        authEndpoint: '8479-102-210-221-22.ngrok-free.app/broadcasting/auth',
        disableStats: true,
      })

      setEcho(echoInstance)
      setConnected(true)
    } catch (err) {
      console.error('Failed to connect to Echo server:', err)
      setError('Failed to connect to the real-time server')
    }

    // Cleanup function
    return () => {
      if (echo) {
        echo.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!echo) return

    // Listen to a public channel
    const channel = echo.channel('public-channel')

    // Listen for an event on that channel
    channel.listen('NewNotification', (data: Notification) => {
      setNotifications((prev) => [...prev, data])
    })

    // Example of listening to a private channel (requires authentication)
    // const privateChannel = echo.private(`user.${userId}`)
    // privateChannel.listen('PrivateNotification', (data) => {
    //   // Handle private notification
    // })

    return () => {
      channel.stopListening('NewNotification')
      // privateChannel.stopListening('PrivateNotification')
    }
  }, [echo])

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Real-time Notifications</h1>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <span className="inline-flex items-center">
          Status:
          <span
            className={`ml-2 h-3 w-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}
          ></span>
          <span className="ml-2">
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </span>
      </div>

      <div className="rounded-lg border bg-gray-50 p-4">
        <h2 className="mb-3 text-lg font-semibold">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500">
            No notifications yet. They will appear here in real-time.
          </p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li key={index} className="rounded border bg-white p-3 shadow-sm">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {notification.timestamp}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Page
