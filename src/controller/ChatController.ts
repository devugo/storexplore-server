import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { throwError } from '../helper/throw-error';
import { User } from '../entity/User';
import { ChatService } from '../service/ChatService';

export class ChatController {
  private chatService = new ChatService();
  private userRepository = getRepository(User);

  async get(request: Request, response: Response, next: NextFunction) {
    const { email } = request.user;

    try {
      const user = await this.userRepository.findOne({ email });

      //  Get chats
      const chats = await this.chatService.get(user, request.query);

      return chats;
    } catch (error) {
      const err = throwError(error);
      return response.status(err.code).json({
        message: err.message,
        success: false,
      });
    }
  }
}
