import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UserService} from '../../../services/user.service';
import {UserExtend} from '../../../models/user-extend.model';
import {User} from '../../../models/user.model';

@Component({
    selector: 'app-users-sidebar',
    templateUrl: './users-sidebar.component.html',
    styleUrls: ['./users-sidebar.component.scss']
})
export class UsersSidebarComponent implements OnInit {
    users: Array<User>;
    userName: string;
    userSurname: string;
    diagnosis: string;
    mhsNumber: number;
    modalRef: BsModalRef;

    constructor(
        private modalService: BsModalService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe(res => this.users = res);
    }

    openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
    }

    get isUserDataAbsent(): boolean {
        return this.userName && this.userName.length >= 3
            && this.userSurname && this.userSurname.length >= 3
            && this.diagnosis && this.diagnosis.length >= 10
            && this.mhsNumber && this.mhsNumber.toString().length >= 3;
    }

    addUser(): void {
        if (!this.isUserDataAbsent) {
            return;
        }

        const userDTO = {
            name: this.userName,
            surname: this.userSurname,
            mhsNumber: this.mhsNumber,
            diagnosis: this.diagnosis
        };

        this.userService.addUser(userDTO).subscribe(res => {
            this.users.push(res);
            this.modalRef.hide();
        });
    }
}
