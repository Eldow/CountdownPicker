import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router) {}
  reload(link:string){
    this.router.navigate(['/'], {skipLocationChange: true})
      .then(() => { this.router.navigate([link]); });
  }
}
