import { IUser } from "./user.interface";

export interface IPreDespachoRequest extends IUser {
  opcion: string;
  cod_Almacen: string;
  id_Pre_Desp: number;
  id_Tip_Mov: number;
  observaciones: string;
  co_Cod_OrdPro: string;
  id_Req_Avios_Acabados: number;
}

export interface IPreDespachoDeleteRequest extends IUser {
  opcion: string;
  id_Pre_Desp: number;
}
