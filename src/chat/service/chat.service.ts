import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreateUser(username: string): Promise<User> {
    try {
      let user = await this.usersRepository.findOne({
        where: { Username: username }
      });

      if (!user) {
        user = this.usersRepository.create({
          Username: username
        });
        await this.usersRepository.save(user);
        this.logger.log(`Nuevo usuario creado: ${username}`);
      }

      return user;
    } catch (error) {
      this.logger.error('Error en findOrCreateUser:', error);
      throw error;
    }
  }

  async saveMessage(userId: number, content: string) {
    try {
      const message = this.messagesRepository.create({
        UserId: userId,
        Content: content
      });

      return await this.messagesRepository.save(message);
    } catch (error) {
      this.logger.error('Error guardando mensaje:', error);
      throw error;
    }
  }

  async getRecentMessages(limit: number = 50) {
    try {
      return await this.messagesRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.user', 'user')
        .orderBy('message.Timestamp', 'DESC')
        .take(limit)
        .getMany();
    } catch (error) {
      this.logger.error('Error obteniendo mensajes recientes:', error);
      throw error;
    }
  }
}