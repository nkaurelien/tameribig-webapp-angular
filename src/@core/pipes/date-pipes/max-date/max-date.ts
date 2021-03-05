import { Pipe, PipeTransform } from '@angular/core';
import max from 'date-fns/max';
import format from 'date-fns/format';
import { parsedOutput } from '../helper-functions';
import { DatePipeManager } from '../providers/date-pipe-manager';
import {parseISO} from "date-fns";

// max date pipe by Aaron Sterling

@Pipe({
  name: 'maxDate',
})
export class MaxDatePipe implements PipeTransform {
  /**
   * Returns the max date from an array of dates
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
    return format(max([...range]), formatToUse);
  }
}
