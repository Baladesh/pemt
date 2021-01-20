import {Component, OnInit} from '@angular/core';

const mobileScreenWidth = 720;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isMobile = false;

    constructor() {
        if (window.screen.width <= mobileScreenWidth) {
            this.isMobile = true;
        }
    }

    ngOnInit(): void {
    }

}
