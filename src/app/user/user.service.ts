import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { User } from './user.class';
import {environment} from '../../environments/environment';

const baseUrl = environment.usersApi;

@Injectable()
export class UserService {
  constructor(public http: Http) {}

  public createUser(user: User): Observable<any>{
    return this.http.post(baseUrl, user,
     {headers: contentHeaders}).map(this.logResponse.bind(this));
  }

  private logResponse(response: Response): any {
    return response.json();
  }

  private mapUsers(response: Response): User[] {
    return response.json().map(this.toUser.bind(this));
  }

  private toUser(r: any): User {
    return <User>({
      userId: r.userId,
      name: r.name
    });
  }

}
