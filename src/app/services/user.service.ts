import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {User} from '../models/user.model';
import {UserExtend} from '../models/user-extend.model';

@Injectable()
export class UserService {
    api = 'http://localhost:3000/users/';

    constructor(private http: HttpClient) {
    }

    addUser(user: User): Observable<User> {
        user.id = new Date().getTime();
        return this.http.post(this.api, user) as Observable<User>;
    }

    getAllUsers(): Observable<Array<User>> {
        return this.http.get(this.api) as Observable<Array<User>>;
    }

    getOneUser(id: number): Observable<UserExtend> {
        return this.http.get(this.api + id) as Observable<UserExtend>;
    }

    updateUser(id: number, data): Observable<UserExtend> {
        return this.http.put(this.api + id, data) as Observable<UserExtend>;
    }
}
