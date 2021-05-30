import net from 'net'

require('dotenv').config()

class WhatapTcpClient {
  client
  constructor() {
    const client = new net.Socket()

    client.connect(Number(process.env.WHATAP_PORT) || 1337, process.env.WHATAP_ADDR || '127.0.0.1', () => {
      console.log('Connected')
      client.write('Hello, server! Love, Client.')
    })

    client.on('data', (data) => {
      console.log('Received: ' + data)
    })

    client.on('close', () => {
      console.log('Connection closed')
    })

    socket.on('error', (err) => {
      console.log(err)
    })

    destroy = () => {
      this.client.destroy() // kill client after server's response
    }

    this.client = client
  }

  send = (message) => {
    this.client.write(message)
  }
}

export default WhatapTcpClient
