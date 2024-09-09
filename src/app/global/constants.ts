import { LocaleSettings } from "primeng/calendar";

export const TipoFiltro = {
  Fechas: 'Por rango de fechas',
  Orden: 'Por orden de corte',
  Despacho: 'Por pre despacho',
  Movimiento: 'Por tipo de movimiento'
}

export const TipoDetalle = {
  tipo1: 'T1',
  tipo2: 'T2'
}

export const EMPTY_VALUE = '';
export const UNDEFINED_VALUE = undefined;
export const FORMATO_FECHA = 'dd-MM-yyyy';
export const FORMATO_FECHA_yyyyMMdd = 'yyyy-MM-dd';
export const FORMATO_FECHA_yyyyMMdd2 = 'yyyy/MM/dd';

export class Constantes {
  public static ES_CALENDARIO: LocaleSettings = {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem'
  };
}
