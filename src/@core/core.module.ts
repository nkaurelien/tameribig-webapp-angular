// Anglar
import {NgModule, Provider, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
// Layout Directives
// import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
// Pipes
// Services
import {
    FirstLetterPipe,
    GetObjectPipe,
    JoinPipe,
    // OffcanvasDirective,
    SafePipe, StickyDirective,
    // ScrollTopDirective,
    // SparklineChartDirective,
    // TabClickEventDirective,
    TimeElapsedPipe,
    // ToggleDirective
} from './_base/layout';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScriptLoaderService } from './services/script-loader.service';
import { SeoService } from './services/seo.service';
import {ToggleDirective} from '@core/_base/layout/directives/toggle.directive';
import {OffcanvasDirective} from '@core/_base/layout/directives/offcanvas.directive';
import {ScrollTopDirective} from '@core/_base/layout/directives/scroll-top.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        // directives
        // HeaderDirective,
        ScrollTopDirective,
        StickyDirective,
        OffcanvasDirective,
        ToggleDirective,
        // MenuDirective,
        // TabClickEventDirective,
        // SparklineChartDirective,
        // ContentAnimateDirective,
        // StickyDirective,
        // pipes
        TimeElapsedPipe,
        JoinPipe,
        GetObjectPipe,
        SafePipe,
        FirstLetterPipe,
    ],
    exports: [
        // directives
        // ScrollTopDirective,
        // HeaderDirective,
        // OffcanvasDirective,
        // ToggleDirective,
        // MenuDirective,
        // TabClickEventDirective,
        // SparklineChartDirective,
        // ContentAnimateDirective,
        // StickyDirective,
        // pipes
        TimeElapsedPipe,
        JoinPipe,
        GetObjectPipe,
        SafePipe,
        FirstLetterPipe,
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
    ]

})
export class CoreModule {
    static forProvider(): Provider[] {
        return [
            // {
            //     provide: HTTP_INTERCEPTORS,
            //     useClass: TokenInterceptorService,
            //     multi: true,
            // },
            ScriptLoaderService,
            SeoService,
        ];
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [...CoreModule.forProvider()]
        };
    }
}
