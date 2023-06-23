import io from 'socket.io-client';
import { SERVER_URL } from '../constants';

export const socketInstance = io(SERVER_URL ?? '', {
  transports: ['websocket'],
});
