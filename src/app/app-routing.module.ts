import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin/admin.component';
import {ProgrammesComponent} from './admin/programmes/programmes.component';
import {UsersComponent} from './admin/users/users.component';
import {AddNewProgrammeComponent} from './admin/programmes/add-new-programme/add-new-programme.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'admin/programmes', pathMatch: 'full' },
            { path: 'admin', component: AdminComponent},
            { path: 'admin/programmes', component: ProgrammesComponent},
            { path: 'admin/add-programme', component: AddNewProgrammeComponent},
            { path: 'admin/edit-programme/:id', component: AddNewProgrammeComponent},
            { path: 'admin/users', component: UsersComponent},
            { path: 'admin/user/:id', component: UsersComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
