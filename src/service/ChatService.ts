import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { Chat } from '../entity/Chat';
import { CreateChatDto } from '../dto/create-chat.dto';
import { User } from '../entity/User';
import { GetChatsFilterDto } from '../dto/get-chats.dto';

export class ChatService {
  private chatRepository = getRepository(Chat);
  private userRepository = getRepository(User);

  async get(
    user: User,
    filterDto: GetChatsFilterDto,
  ): Promise<{ count: number; chats: Chat[] }> {
    const { other } = filterDto;
    try {
      const query = this.chatRepository.createQueryBuilder('chat');
      query.andWhere(
        '(chat.fromId = :from AND chat.toId = :to) OR (chat.fromId = :to AND chat.toId = :from)',
        {
          from: user.id,
          to: other!,
        },
      );
      query.leftJoinAndSelect('chat.to', 'to');
      query.leftJoinAndSelect('chat.from', 'from');
      query.orderBy('chat.createdAt', 'ASC');
      const count = await query.getCount();
      const chats = await query.getMany();

      return { count, chats };
    } catch (error) {
      throw error;
    }
  }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const { message, from, to } = createChatDto;

      this.chatRepository.create({
        message,
      });
      const userFrom = await this.userRepository.findOne({
        where: { id: from },
      });
      const userTo = await this.userRepository.findOne({
        where: { id: to },
      });

      if (userFrom && userTo) {
        const chat = this.chatRepository.create({
          message,
          from: userFrom,
          to: userTo,
        });

        await this.chatRepository.save(chat);
        return chat;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, store: Store): Promise<any> {
    try {
      const chat = await this.chatRepository.findOne({
        where: { store, id },
      });
      const deleteChat = await this.chatRepository.remove(chat);
      return deleteChat;
    } catch (error) {
      throw error;
    }
  }
}
