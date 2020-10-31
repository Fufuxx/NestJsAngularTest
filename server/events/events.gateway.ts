import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import axios from 'axios';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  clients: WebSocket[];

  afterInit() {
    this.clients = [];
    // Send new Rate every 10s
    setInterval(
      () => this.broadcast(this.clients),
      30000
    );
  }

  // On connection
  handleConnection(client: WebSocket) {
    this.clients.push(client);
    // Send First rate
    this.broadcast(this.clients);
  }

  // Broadcast to Clients
  async broadcast(clients: WebSocket[]) {
    // -> Real deal open BTC rate api
    // const res = await axios.get('https://blockchain.info/ticker');
    // const newRate = res.data?.USD?.last;

    const newRate = Number(Math.floor((Math.random() * 7000) + 5000));
    if(newRate) {
      clients.forEach(c => c.send(
        JSON.stringify(
          { 
            exchange_rate: newRate
          }
        )
      ));
    }
  }

}