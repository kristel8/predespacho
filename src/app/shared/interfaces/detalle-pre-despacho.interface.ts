import { IUser } from './user.interface';

export interface IDetallePreDespachoRequest {
  opcion: string;
  id_Pre_Desp: number;
}

export interface IDetallePreDespachoResponse {
  id: number;
  cantidad: number;
  cod_Usu_Asigna_Pre_Desp: string;
  fec_Asigna_Pre_Desp: string;
  cod_Est_Asigna_Pre_Desp: string;
}

export interface IGenerateDetalleRequest extends IUser {
  opcion: string;
  id_Pre_Desp: number;
  id: number;
  sector1: string;
}
