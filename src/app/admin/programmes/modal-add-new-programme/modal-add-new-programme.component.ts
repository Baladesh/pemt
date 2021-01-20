import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Programme} from '../../../models/programme.model';

@Component({
    selector: 'app-modal-add-new-programme',
    templateUrl: './modal-add-new-programme.component.html',
    styleUrls: ['./modal-add-new-programme.component.scss']
})
export class ModalAddNewProgrammeComponent implements OnInit {
    @ViewChild('modalAddProgramme') public templateRef: TemplateRef<any>;
    programme: Programme;
    isEdit: boolean;
    programmeId: number;

    private modalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    ngOnInit(): void {
    }

    openModal(edit: boolean = false, programme?: Programme): void {
        this.isEdit = edit;
        this.modalRef = this.modalService.show(this.templateRef, {class: 'add-programme-modal'});
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
