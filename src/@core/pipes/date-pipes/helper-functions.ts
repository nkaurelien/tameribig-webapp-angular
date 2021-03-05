// helper functions for date pipes
import {formatDistance, isValid, parseISO} from "date-fns";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export function isValidInput(input: string): boolean {
    if (!(typeof input === 'number' || typeof input === 'string')) {
        return false;
    } else {
        return isValid(parseISO(input));
    }
}

// export function outputIfInputsValid(input: any, output: string, optionalInput?: any): string {
//     if (optionalInput && !isValidInput(optionalInput)) {
//         return '';
//     }
//     else if (isValidInput(input) && isValidInput(output)) {
//         return output;
//     }
//     else {
//         return '';
//     }
// }

export function parsedOutput(outputToParse: string): string {
    if (isValid(parseISO(outputToParse))) {
        return outputToParse;
    }
    else {
        return '';
    }
}

export function distanceInWordsToNow(date: string | number | Date, options:any) {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  formatDistanceToNow(date, options)
}
export function distanceInWords(date: string | number | Date,baseDate: string | number | Date, options:any) {
  if (typeof date === "string") {
    date = parseISO(date);
  }
  if (typeof baseDate === "string") {
    baseDate = parseISO(baseDate);
  }
  formatDistance(date, baseDate, options)
}
