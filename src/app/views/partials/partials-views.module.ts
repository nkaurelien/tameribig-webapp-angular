// Angular
import {RouterModule} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
// NgBootstrap
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Core module
import {CoreModule} from '@core/core.module';
// CRUD Partials
import {
    ActionNotificationComponent,
    AlertComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
} from './content/crud';
// Layout partials
import {
    ContextMenu2Component,
    ContextMenuComponent,
    LanguageSelectorComponent,
    NotificationComponent,
    QuickActionComponent,
    QuickPanelComponent,
    ScrollTopComponent,
    SearchDefaultComponent,
    SearchDropdownComponent,
    SearchResultComponent,
    SplashScreenComponent,
    Subheader1Component,
    Subheader2Component,
    Subheader3Component,
    Subheader4Component,
    Subheader5Component,
    UserProfile2Component,
    UserProfile3Component,
    UserProfileComponent
} from './layout';
// General
import {NoticeComponent} from './content/general/notice/notice.component';
import {PortletModule} from './content/general/portlet/portlet.module';
// Errpr
import {ErrorComponent} from './content/general/error/error.component';
// Extra module
import {WidgetModule} from './content/widgets/widget.module';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
import {CartComponent} from './layout/topbar/cart/cart.component';
import {NgbTabset, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        ScrollTopComponent,
        NoticeComponent,
        ActionNotificationComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        AlertComponent,

        // topbar components
        ContextMenu2Component,
        ContextMenuComponent,
        QuickPanelComponent,
        ScrollTopComponent,
        SearchResultComponent,
        SplashScreenComponent,
        Subheader1Component,
        Subheader2Component,
        Subheader3Component,
        Subheader4Component,
        Subheader5Component,
        LanguageSelectorComponent,
        NotificationComponent,
        QuickActionComponent,
        SearchDefaultComponent,
        SearchDropdownComponent,
        UserProfileComponent,
        UserProfile2Component,
        UserProfile3Component,
        CartComponent,

        ErrorComponent,
    ],
    exports: [
        WidgetModule,
        PortletModule,

        ScrollTopComponent,
        NoticeComponent,
        ActionNotificationComponent,
        DeleteEntityDialogComponent,
        FetchEntityDialogComponent,
        UpdateStatusDialogComponent,
        AlertComponent,

        // topbar components
        ContextMenu2Component,
        ContextMenuComponent,
        QuickPanelComponent,
        ScrollTopComponent,
        SearchResultComponent,
        SplashScreenComponent,
        Subheader1Component,
        Subheader2Component,
        Subheader3Component,
        Subheader4Component,
        Subheader5Component,
        LanguageSelectorComponent,
        NotificationComponent,
        QuickActionComponent,
        SearchDefaultComponent,
        SearchDropdownComponent,
        UserProfileComponent,
        UserProfile2Component,
        UserProfile3Component,
        CartComponent,

        ErrorComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // NgbModule,
        PerfectScrollbarModule,
        InlineSVGModule,
        CoreModule,
        PortletModule,
        WidgetModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialogModule,
        NgbTabsetModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
    ]
})
export class PartialsViewsModule {
}
