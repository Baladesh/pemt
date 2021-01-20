import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Programme} from '../models/programme.model';

@Injectable()
export class ProgrammeService {
    api = 'http://localhost:3000/programmes/';

    constructor(private http: HttpClient) {}

    addProgramme(programme: Programme): Observable<Programme> {
        programme.id = new Date().getTime();
        return this.http.post(this.api, programme) as Observable<Programme>;
    }

    getAllProgrammes(): Observable<Array<Programme>> {
        return this.http.get(this.api) as Observable<Array<Programme>>;
    }

    getProgramme(id: number): Observable<Programme> {
        return this.http.get(this.api + id) as Observable<Programme>;
    }

    updateProgramme(programme: Programme, id: number): Observable<Programme> {
        return this.http.put(this.api + id, programme) as Observable<Programme>;
    }
}
