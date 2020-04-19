import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import { NetworkLayoutComponent } from './network-layout/network-layout.component';
import { UserNetworkActivitiesComponent } from './user-network-activities/user-network-activities.component';
import {
    AccordionModule,
    ButtonsModule,
    CardsModule,
    CarouselModule,
    IconsModule,
    PreloadersModule,
    BadgeModule,
    WavesModule,
    TabsModule
} from 'ng-uikit-pro-standard';
import {FooterComponent} from './network-layout/footer/footer.component';
import {NavigationModule} from './network-layout/navigation/navigation.module';
import {LazyLoadImageModule} from 'ng-lazyload-image';


@NgModule({
    declarations: [NetworkLayoutComponent, UserNetworkActivitiesComponent, FooterComponent],
    imports: [
        CommonModule,
        NetworkRoutingModule,
        NavigationModule,
        CarouselModule,
        AccordionModule,
        CardsModule,
        // ModalModule,
        IconsModule,
        WavesModule,
        PreloadersModule,
        TabsModule,
        // InputsModule,
        ButtonsModule,
        LazyLoadImageModule,
        BadgeModule,
    ]
})
export class NetworkModule { }
