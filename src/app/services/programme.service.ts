import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Programme} from '../models/programme.model';

@Injectable()
export class ProgrammeService {
    headers: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    addProgramme(programme: Programme): Observable<Programme> {
        programme.id = new Date().getTime();
        return this.http.post('http://localhost:3000/programmes', programme, { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<Programme>;
    }

    getAllProgrammes(): Observable<Array<Programme>> {
        return this.http.get('http://localhost:3000/programmes', { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<Array<Programme>>;
    }

    getProgramme(id: number): Observable<Programme> {
        return this.http.get('http://localhost:3000/programmes/' + id, { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<Programme>;
    }

    updateProgramme(programme: Programme, id: number): Observable<Programme> {
        return this.http.put('http://localhost:3000/programmes/' + id, programme,{ headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<Programme>;
    }
}
