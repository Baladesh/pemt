import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgrammeService} from '../../services/programme.service';
import {Programme} from '../../models/programme.model';
import {Subscription} from 'rxjs';

const mobileScreenWidth = 720;

@Component({
    selector: 'app-programmes',
    templateUrl: './programmes.component.html',
    styleUrls: ['./programmes.component.scss']
})

export class ProgrammesComponent implements OnInit, OnDestroy {
    programmes: Array<Programme> = [];
    isMobile = false;
    private subscriptions = new Subscription();

    constructor(private programmeService: ProgrammeService) {
        if (window.screen.width <= mobileScreenWidth) {
            this.isMobile = true;
        }
    }

    ngOnInit(): void {
        this.getAllProgrammes();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    getAllProgrammes(): void {
        this.subscriptions.add(this.programmeService.getAllProgrammes().subscribe(res => {
            this.programmes = res;
        }));
    }
}
