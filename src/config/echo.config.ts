"use client"

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import type { PresenceChannel } from 'laravel-echo';

const port = process.env.NEXT_PUBLIC_REVERB_PORT;
const useTLS = process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https'

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<'reverb'>;
  }
}

export async function authorizeChannel(socketId: string, channelName: string) {
  const res = await fetch('/broadcasting/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      socket_id: socketId,
      channel_name: channelName,
    }),
  });

  if (!res.ok) {
    throw new Error('Authorization failed');
  }

  return res.json();
}

export type PrivateChannel = PresenceChannel & {
  name: string
}


const echoConfig = async (accessToken?: string) => {
  // Enable native WebSockets
  window.Pusher = Pusher;

  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: 'reverb',
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: port ? parseInt(port) : undefined,
      wssPort: port ? parseInt(port) : undefined,
      forceTLS: useTLS,
      encrypted: useTLS,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: `${process.env.NEXT_PUBLIC_REVERB_URL}/broadcasting/auth`,
      auth: {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // More standard header
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
      }
    });
  }
  return window.Echo;
}

export default echoConfig;