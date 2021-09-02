import { ChatController } from '../controller/ChatController';
import { authenticate } from '../middleware/authenticate';

export const ChatRoutes = [
  {
    method: 'get',
    route: '/chats',
    controller: ChatController,
    action: 'get',
    middleware: authenticate,
    validation: [],
  },
];
