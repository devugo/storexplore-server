import { getRepository } from 'typeorm';
import { Store } from '../entity/Store';
import { Chat } from '../entity/Chat';
import { CreateChatDto } from '../dto/create-chat.dto';
import { User } from '../entity/User';

export class ChatService {
  private chatRepository = getRepository(Chat);
  private userRepository = getRepository(User);

  // async get(
  //   store: Store,
  //   filterDto: GetProductsFilterDto,
  // ): Promise<{ count: number; products: Product[] }> {
  //   const { page } = filterDto;
  //   try {
  //     const query = this.productRepository.createQueryBuilder('product');
  //     query.andWhere('product.storeId = :store', {
  //       store: store.id,
  //     });

  //     if (page) {
  //       query.skip(PAGINATION.itemsPerPage * (parseInt(page) - 1));
  //     }
  //     const count = await query.getCount();
  //     const products = await query.take(PAGINATION.itemsPerPage).getMany();

  //     return { count, products };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getOne(id: string, store: Store): Promise<Product> {
  //   try {
  //     const product = await this.productRepository.findOne({
  //       where: { id, store },
  //     });

  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const { message, from, to } = createChatDto;

      this.chatRepository.create({
        message,
      });
      const userFrom = await this.userRepository.findOne({ id: from });

      // const chat = this.chatRepository.create({
      //   message,
      //   from,
      //   to,
      // });

      // await this.chatRepository.save(chat);
      // return chat;
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
