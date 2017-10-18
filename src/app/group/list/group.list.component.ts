// components/toolbar.component.ts
import { Component } from '@angular/core';
import { GroupService } from '../group.service';
import {Group} from '../group.class';

@Component({
  selector: 'app-group-list',
  templateUrl: './group.list.component.html',
  styleUrls: ['./group.list.component.css']
})

export class GroupListComponent {
  groups = [];
  group = <Group>({
    _id: '',
    people: [],
    name: 'Group name',
  });
  constructor(public groupService: GroupService) {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }
  createGroup() {
    this.groupService.createGroup(this.group).subscribe((data) => {
      this.groups.unshift(data);
    });
  }
  deleteGroup(group: Group) {
    this.groups.splice(this.groups.indexOf(group), 1);
    this.groupService.deleteGroup(group).subscribe(() => console.log('Group deleted'));
  }
}
