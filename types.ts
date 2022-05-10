export interface ServerToClientEvents {
  message: (message: string, from: { id: string; nickname: string }) => void;
  connected: (nickname: string, rooms: string[]) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  _error: (errorMessage: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: () => void;
}

export interface InterServerEvents {}

export interface ServerSocketData {
  nickname: string;
}
