// components/toolbar.component.ts
import {Component, HostListener} from '@angular/core';
import { GroupService } from '../group.service';
import {Group} from '../group.class';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-shuffle',
  templateUrl: './group.shuffle.component.html',
  styleUrls: ['./group.shuffle.component.css']
})

export class GroupShuffleComponent {
  groups = [];
  selectedGroup: any;
  displayText: string = '';
  interval: any;
  timeout: any;
  shuffling = false;
  loading = false;

  constructor(public groupService: GroupService, route: ActivatedRoute) {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data;
      if (this.groups.length > 0) this.selectedGroup = this.groups[0];
      if (this.interval) this.cancelShuffle();
    });
  }

  shuffle() {
    this.shuffling = true;
    this.loading = true;
    if (!this.selectedGroup || this.selectedGroup.people.length === 0) return;
    const people = this.selectedGroup.people;
    const speed = 500;
    const stop = 10000;
    let current = 0;
    this.interval = setInterval(() => {
      clearTimeout(this.timeout);
      const currentName = people[Math.floor(Math.random() * people.length)];
      this.showText(currentName, 0, speed / (currentName.length), false);
      current += speed;
      if (current > stop) {
        this.showText(currentName, 0, speed / currentName.length, true);
        clearInterval(this.interval);
      }
    }, speed);
  }

  showText(message, index, interval, last) {
    if (index < message.length) {
      const begin = this.displayText.substr(0, index) || '';
      const end = this.displayText.substr(index + 1) || '';
      this.displayText = (begin + message[index++] + end).substr(0, message.length);
      this.timeout = setTimeout( () => { this.showText(message, index, interval, last); }, interval);
    } else {
      if (last) {
        this.loading = false;
      }
    }
  }

  cancelShuffle() {
    this.shuffling = false;
    clearInterval(this.interval);
  }

}
