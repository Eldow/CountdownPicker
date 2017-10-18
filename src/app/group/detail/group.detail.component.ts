// components/toolbar.component.ts
import {Component, Input} from '@angular/core';
import { GroupService } from '../group.service';
import {Group} from '../group.class';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group.detail.component.html',
  styleUrls: ['./group.detail.component.css']
})

export class GroupDetailComponent {
  @Input()
  group: Group;
  newPeople: string;
  edit = false;
  canFocus = false;

  constructor(public groupService: GroupService) {
  }
  updateGroup() {
    if (this.group.name.length < 1) return;
    this.groupService.updateGroup(this.group).subscribe(() => console.log('Entry updated'));
    this.edit = false;
  }
  pushPeople() {
    if (!this.newPeople || this.newPeople === '') return;
    this.group.people.unshift(this.newPeople);
    this.newPeople = '';
    this.groupService.updateGroup(this.group).subscribe(() => console.log('Entry added'));
  }
  splicePeople(person: string) {
    this.group.people.splice(this.group.people.indexOf(person), 1);
    this.groupService.updateGroup(this.group).subscribe(() => console.log('Entry deleted'));
  }
}
