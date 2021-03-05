import { Pipe, PipeTransform } from '@angular/core';
import min from 'date-fns/min';
import format from 'date-fns/format';
import { parsedOutput } from '../helper-functions';
import { DatePipeManager } from '../providers/date-pipe-manager';
import {parseISO} from "date-fns";

// min date pipe by Aaron Sterling

@Pipe({
  name: 'minDate',
})
export class MinDatePipe implements PipeTransform {
  /**
   * Returns the min date from a range of dates
   */

  constructor(private manager: DatePipeManager) {}

  transform(range: Array<any | string | number | Date>, dateFormat?: string) {
    const formatToUse = this.manager.getDefaultFormat(dateFormat);
    range = range.map(value => {
      if (typeof value === "string") {
        return parseISO(value);
      }
      return value;
    });
    return format(min(
      [...range]
    ), formatToUse);
  }
}
