// Anglar
import {NgModule, Provider, ModuleWithProviders} from '@angular/core';
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
    SafePipe,
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

@NgModule({
    imports: [CommonModule],
    declarations: [
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
    providers: [
       
    ]
})
export class CoreModule {
    static forProvider(): Provider[] {
        return [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true,
            },
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
