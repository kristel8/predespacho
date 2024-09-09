import { IUser } from "./user.interface";

export interface IDetallePreDespachoDeleteRequest extends IUser {
  opcion: string;
  id_Pre_Desp: number;
  id: number;
}

export interface IDetalleDetallePreDespachoRequest {
  opcion: string;
  id_Pre_Desp: number;
  id: number;
}

export interface IDetalleDetallePreDespachoResponse {
  id: number;
  cantidad: number;
  cod_Usu_Asigna_Pre_Desp: string;
  fec_Asigna_Pre_Desp: string;
  cod_Est_Asigna_Pre_Desp: string;
}
