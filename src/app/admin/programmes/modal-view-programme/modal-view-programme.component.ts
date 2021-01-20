import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Programme} from '../../../models/programme.model';

const mobileScreenWidth = 720;

@Component({
    selector: 'app-modal-view-programme',
    templateUrl: './modal-view-programme.component.html',
    styleUrls: ['./modal-view-programme.component.scss']
})

export class ModalViewProgrammeComponent implements OnInit {
    @ViewChild('modalViewProgramme') public templateRef: TemplateRef<any>;
    programme: Programme;
    isEdit: boolean;
    programmeId: number;
    isMobile = false;

    private modalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
        if (window.screen.width <= mobileScreenWidth) {
            this.isMobile = true;
        }
    }

    ngOnInit(): void {
    }

    openModal(edit: boolean = false, programme?: Programme): void {
        const modalClass = this.isMobile ? 'add-programme-modal is-mobile' : 'add-programme-modal';
        this.isEdit = edit;
        this.modalRef = this.modalService.show(this.templateRef, {class: modalClass});
        this.programmeId = programme.id;
        this.programme = programme;
    }

    getImage(image): string {
        return 'data:image/png;base64,' + image.path;
    }


    getExerciseAttach(exercise): void {
        return exercise.attachments;
    }
}
