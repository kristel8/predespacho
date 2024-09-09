import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FORMATO_FECHA_yyyyMMdd, FORMATO_FECHA_yyyyMMdd2 } from '../global';

@Pipe({
  name: 'formatField',
})
export class FormatFieldPipe implements PipeTransform {
  transform(value: string | null | undefined, field?: string): string {
    if (typeof value === 'number') {
      return value;
    }

    if (value == null || value.trim() === '') {
      return 'Ninguno';
    }

    return value;
  }

  formatDate(value: string, date = FORMATO_FECHA_yyyyMMdd): string {
    const fecha = parseISO(value);
    return format(fecha, date);
  }

  formatFecha(value, formato = FORMATO_FECHA_yyyyMMdd2): string {
    if (typeof value === 'string') {
      return this.formatDate(value);
    }

    const date = new Date(value);
    const typeFormat = formato === FORMATO_FECHA_yyyyMMdd ? '-' : '/';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}${typeFormat}${month}${typeFormat}${day}`;
  }
}
