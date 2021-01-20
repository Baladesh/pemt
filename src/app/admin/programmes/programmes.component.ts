import {Component, OnInit} from '@angular/core';
import {ProgrammeService} from '../../services/programme.service';
import {Programme} from '../../models/programme.model';

@Component({
    selector: 'app-programmes',
    templateUrl: './programmes.component.html',
    styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {
    programmes: Array<Programme> = [];

    constructor(private programmeService: ProgrammeService) {
    }

    ngOnInit(): void {
        this.getAllProgrammes();
    }

    getAllProgrammes(): void {
        this.programmeService.getAllProgrammes().subscribe(res => {
            this.programmes = res;
        });
    }
}
