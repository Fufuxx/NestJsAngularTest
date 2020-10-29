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

  clients: any[];

  afterInit() {
    this.clients = [];
    // setInterval(
    //   () => this.broadcast(this.clients),
    //   10000
    // );
  }

  handleConnection(client: any) {
    this.clients.push(client);
    this.broadcast(this.clients);
  }

  async broadcast(clients: any[]) {
    const res = await axios.get('https://blockchain.info/ticker');
    const newRate = res.data?.USD?.last;
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