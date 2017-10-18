import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../../../src/app/auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Group } from './group.class';
import { environment } from '../../environments/environment';

const baseUrl = environment.groupsApi;

@Injectable()
export class GroupService {
  constructor(public http: Http) {}

  public createGroup(group: Group): Observable<Group> {
    const profile = JSON.parse(localStorage.getItem('profile'));
    group.owner = { 'name': profile.nickname, 'userId': profile.user_id};
    return this.http.post(baseUrl, group,
     {headers: contentHeaders}).map(this.toGroup.bind(this));
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put(`${baseUrl}/${group._id}`, group,
      {headers: contentHeaders}).map(this.toGroup.bind(this));
  }

  public deleteGroup(group: Group): Observable<Group> {
    return this.http.delete(`${baseUrl}/${group._id}`,
      {headers: contentHeaders}).map(this.toGroup.bind(this));
  }

  public getGroups(): Observable<Group[]> {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const owner = { 'name': profile.nickname, 'userId': profile.user_id};
    return this.http.get(`${baseUrl}?owner=${owner.userId}`,
     {headers: contentHeaders}).map(this.mapGroups.bind(this));
  }

  private mapGroups(response: Response): Group[] {
    return response.json().map(this.toGroup.bind(this));
  }

  private logResponse(response: Response): any {
    return response.json();
  }

  private toGroup(r: any): Group {
    if (r._body) {
      r = r.json();
    }
    console.log(r);
    return <Group>({
      _id: r._id,
      name: r.name,
      people: r.people,
      owner: r.owner,
      createdAt: new Date(r.createdAt),
    });
  }

}
