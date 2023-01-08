import { HydratedDocument } from "mongoose";

export type ClientDocument = HydratedDocument<Client>;

export class Client {
  public readonly id?: string;
  public name: string;
  public email: string;
  public cellphone: string;
  public cpf: string;
  public address: string;

  constructor(props: Client) {
    Object.assign(this, props);
  }
}
