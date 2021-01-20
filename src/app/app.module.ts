import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminComponent} from './admin/admin.component';
import {PEMTCommonModule} from './common/common.module';
import { UsersComponent } from './admin/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import {UserService} from './services/user.service';
import { ModalAddNewProgrammeComponent } from './admin/programmes/modal-add-new-programme/modal-add-new-programme.component';
import {ProgrammesComponent} from './admin/programmes/programmes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {ProgrammeService} from './services/programme.service';
import { AddNewProgrammeComponent } from './admin/programmes/add-new-programme/add-new-programme.component';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        UsersComponent,
        ProgrammesComponent,
        ModalAddNewProgrammeComponent,
        AddNewProgrammeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        PEMTCommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        SelectDropDownModule,
    ],
    exports: [
        ModalAddNewProgrammeComponent
    ],
    providers: [UserService, ProgrammeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
