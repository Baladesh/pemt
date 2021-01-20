import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {User} from '../models/user.model';
import {UserExtend} from '../models/user-extend.model';

@Injectable()
export class UserService {
    headers: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    addUser(user: User): Observable<User> {
        user.id = new Date().getTime();
        return this.http.post('http://localhost:3000/users', user, { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<User>;
    }

    getAllUsers(): Observable<Array<User>> {
        return this.http.get('http://localhost:3000/users', { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<Array<User>>;
    }

    getOneUser(id: number): Observable<UserExtend> {
        return this.http.get('http://localhost:3000/users/' + id, { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<UserExtend>;
    }

    updateUser(id: number, data): Observable<UserExtend> {
        return this.http.put('http://localhost:3000/users/' + id, data, { headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })}) as Observable<UserExtend>;
    }
}
