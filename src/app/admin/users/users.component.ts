import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserExtend} from '../../models/user-extend.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProgrammeService} from '../../services/programme.service';
import {Programme} from '../../models/programme.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    userId: number;
    user: UserExtend;
    modalRef: BsModalRef;
    programmes: Array<Programme>;
    selectedProgramme: Programme;
    error = false;

    constructor(
        private readonly route: ActivatedRoute,
        private modalService: BsModalService,
        private userService: UserService,
        private programmeService: ProgrammeService
    ) {
        this.route.params.subscribe(res => {
            if (res && Object.keys(res).length !== 0) {
                this.userId = +this.route.snapshot.paramMap.get('id');
                this.getUser();
            }
        });
    }

    ngOnInit(): void {
        this.getAllProgrammes();
    }

    getUser(): void {
        this.userService.getOneUser(this.userId).subscribe(res => {
            this.user = res;
        });
    }

    getAllProgrammes(): void {
        this.programmeService.getAllProgrammes().subscribe(res => {
            this.programmes = res;
        });
    }

    openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
    }

    addProgramme(): void {
        if (this.user.assignedProgrammes && this.user.assignedProgrammes.some(p => p.id === this.selectedProgramme.id)) {
            this.error = true;
            return;
        };

        let userDTO = {};

        if (this.user.assignedProgrammes) {
            this.user.assignedProgrammes = this.user.assignedProgrammes.concat(this.selectedProgramme);
            userDTO = {...this.user};
        } else {
            userDTO = {
                ...this.user,
                assignedProgrammes: [this.selectedProgramme]
            };
        }

        this.userService.updateUser(this.userId, userDTO).subscribe(res => {
            this.selectedProgramme = null;
            this.modalRef.hide();
            this.user = res;
        });
    }

    getExerciseAttach(exercise): void {
        return exercise.attachments;
    }

    getImage(image): string {
        return 'data:image/png;base64,' + image.path;
    }

    get isUserDataAbsent(): boolean {
        return this.selectedProgramme && this.selectedProgramme.id !== 0;
    }
}
