import { Pipe, PipeTransform } from '@angular/core';
import { parsedOutput } from '../helper-functions';
import {DatePipeManager, DefaultLocaleFr} from '../providers/date-pipe-manager';
import {format, parseISO} from "date-fns";

// Date Pipe by Aaron Sterling

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  /**
   * Input can be a string, number or Date
   * Pipe returns the output of the date-fns format function
   */

  constructor(private manager: DatePipeManager) {}

  transform(value: string | number | Date, dateFormat?: string) {
    const formatToUse = this.manager.getDefaultFormat(dateFormat);
    // const options = { locale: this.manager.getDefaultLocale() };
    if (typeof value === "string") {
      value = parseISO(value)
    }
    return format(value, formatToUse, this.manager.getDefaultOption());
  }
}
