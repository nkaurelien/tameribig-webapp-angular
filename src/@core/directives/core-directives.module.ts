import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutofocusDirective} from './auto-focus.directive';
import {ConfirmDirective} from './confirm.directive';
import {DebounceClickDirective} from './debounce_click.directive';
import {HrefPreventDefaultDirective} from './href-prevent-default.directive';
import {UnwrapTagDirective} from './unwrap-tag.directive';


@NgModule({
    declarations: [
        AutofocusDirective,
        ConfirmDirective,
        DebounceClickDirective,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
    ],
    exports: [
        AutofocusDirective,
        ConfirmDirective,
        DebounceClickDirective,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
    ],
    imports: [
        CommonModule
    ]
})
export class CoreDirectivesModule {
}
