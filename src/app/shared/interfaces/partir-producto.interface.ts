import { IUser } from './user.interface';

export interface IPartirRequest extends IUser {
  Id: number;
  cantidad_del_NUEVO_paquete: number;
  Nro_Paquetes: number;
  Impresora: string;
}
