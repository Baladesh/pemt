import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import { UsersSidebarComponent } from './components/users-sidebar/users-sidebar.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        HeaderComponent,
        UsersSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        UsersSidebarComponent
    ],
})
export class PEMTCommonModule {
}
