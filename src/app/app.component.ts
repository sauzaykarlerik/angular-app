import {Component} from '@angular/core';
import {AppService} from './app.service';
import {Thing} from '../models/thing.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clone: { [s: string]: Thing } = {};

  constructor(public appService: AppService) {
  }

  onRowEditInit(thing: Thing) {
    this.clone[thing._id as string] = {...thing};
  }

  onRowEditSave(thing: Thing) {
    this.appService.updateOne(thing).subscribe(() => {
      delete this.clone[thing._id as string];
    });
  }

  onRowEditCancel(thing: Thing) {
    const index: number = this.appService.getIndex(thing);
    this.appService.things[index] = this.clone[thing._id as string];
    delete this.clone[thing._id as string];
  }
}
