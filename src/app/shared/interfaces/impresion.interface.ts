export interface IImpresionRequest {
  opcion: number;
  ids: number;
  impresora: string;
}

export interface IImpresorasResponse {
  idImpresora: number;
  nomImpresora: string;
  rutaUbicacionImpresora: string;
}
