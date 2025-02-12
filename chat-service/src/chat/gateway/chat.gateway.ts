import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../service/chat.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Cliente intentando conectar: ${client.id}`);
    } catch (error) {
      this.logger.error('Error en conexión inicial:', error);
      client.disconnect();
    }
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() userData: any
  ) {
    try {
      const username = userData.nombreUsuario;
      if (!username) {
        throw new Error('Nombre de usuario no proporcionado');
      }
  
      const user = await this.chatService.findOrCreateUser(username);
      
      // Guardar usuario en el socket
      client['user'] = {
        id: user.Id,
        username: user.Username
      };
  
      // Cargar y enviar mensajes históricos
      const recentMessages = await this.chatService.getRecentMessages();
      const formattedMessages = recentMessages.map(msg => ({
        message: msg.Content,
        uid: msg.UserId,
        username: msg.user.Username,
        timestamp: msg.Timestamp
      }));
  
      // Enviar mensajes históricos al cliente que se conecta
      client.emit('recentMessages', formattedMessages);
  
      this.logger.log(`Cliente conectado: ${username}`);
    } catch (error) {
      this.logger.error('Error en joinChat:', error);
      client.emit('error', { message: 'Error al unirse al chat' });
    }
  }

  @SubscribeMessage('sendMessage')
async handleMessage(
  @ConnectedSocket() client: Socket,
  @MessageBody() payload: { message: string }
) {
  try {
    // Añadir logs para debug
    console.log('Payload recibido:', payload);
    
    const user = client['user'];
    console.log('Usuario en el socket:', user);

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    // Guardar mensaje
    const savedMessage = await this.chatService.saveMessage(
      user.id,
      payload.message
    );

    // Emitir el mensaje con la estructura correcta que espera tu frontend
    const messageToEmit = {
      message: payload.message,
      uid: user.id,
      username: user.username,
      timestamp: new Date().toISOString()
    };

    this.server.emit('newMessage', messageToEmit);
    
  } catch (error) {
    console.error('Error completo:', error);
    client.emit('error', { message: 'Error al enviar el mensaje' });
  }
}

  async handleDisconnect(client: Socket) {
    const user = client['user'];
    this.logger.log(`Cliente desconectado: ${user?.username || client.id}`);
  }
}