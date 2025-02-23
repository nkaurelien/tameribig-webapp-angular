// Angular
import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'kt-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
    // Public properties
    // type of error template to be used, accepted values; error-v1 | error-v2 | error-v3 | error-v4 | error-v5 | error-v6
    @Input() type: string = 'error-v1';
    // full background image
    @Input() image: string;
    // error code, some error types template has it
    @Input() code: string = '404';
    // error title
    @Input() title: string;
    // error subtitle, some error types template has it
    @Input() subtitle: string;
    // error descriptions
    @Input() desc: string = 'Oops! Something went wrong!';
    // return back button title
    @Input() return: string = 'Return back';

    @HostBinding('class') classes: string = 'kt-grid kt-grid--ver kt-grid--root';
}
