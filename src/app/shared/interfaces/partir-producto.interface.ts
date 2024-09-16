import { IUser } from './user.interface';

export interface IPartirRequest extends IUser {
  Id: number;
  cantidad_del_NUEVO_paquete: number;
  Nro_Paquetes: number;
  Impresora: string;
}

export interface IAtributoPaqueteResponse {
  codigo: string;
  cod_item: string;
  cantidad: number;
  cod_UniMed: string;
  cod_prov: string;
  cod_talla: string;
  combo: string;
  upc: string;
  nom_Usuario: string;
  fec_Creacion: string;
}
