export interface IBandejaRequest {
  opcion: string;
  cod_Almacen: string;
  id_Pre_Desp?: string;
  co_CodOrdPro?: string;
  id_Req_Avios_Acabados?: string;
  fec_inicio?: string;
  fec_fin?: string;
  isSoloPendienteDespacho: boolean;
  id_Tip_Mov?: number;
}

export interface IBandejaResponse {
  id_Pre_Desp: number;
  id_Tip_Mov: number;
  des_Tip_Mov: string;
  observaciones: string;
  co_CodOrdPro: string;
  fec_Creacion: string;
  isTieneBarrasAsociadas: string;
}
