import { v4 as uuid } from "uuid";
export class Strategy {
  id: string;
  playerId: string;
  name: string;

  constructor(playerId: string, name: string) {
    this.id = uuid();
    this.playerId = playerId;
    this.name = name;
  }
}
