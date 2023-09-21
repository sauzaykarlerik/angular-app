import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Thing} from 'src/models/thing.model';
import {MessageService} from 'primeng/api';
import {mergeMap, Observable, of} from 'rxjs';

@Injectable()
export class AppService {
  url: string = 'http://localhost:3000/';
  things: Thing[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.getAll();
  }

  getAll() {
    this.http.get<Thing[]>(this.url).subscribe((things: Thing[]) => {
      this.things = [...things];
      this.notification('Datas received (' + this.things.length + ' entries)');
    });
  }

  addOne() {
    const thing: Thing = {data: 'Thing_' + Math.floor(Math.random() * 9999)};
    this.http.post<Thing>(this.url, thing).subscribe((x: Thing) => {
      this.things = [...this.things, x];
      this.notification('Data added (' + thing.data + ')');
    });
  }

  updateOne(thing: Thing): Observable<null> {
    return this.http.put(this.url, thing).pipe(mergeMap(() => {
      this.things[this.getIndex(thing)] = {...thing};
      this.notification('Data updated (' + thing.data + ')');
      return of(null);
    }));
  }

  deleteOne(thing: Thing) {
    this.http.delete(this.url + thing._id).subscribe(() => {
      this.things = this.things.filter((t: Thing): boolean => t._id != thing._id);
      this.notification('Data deleted (' + thing.data + ')');
    });
  }

  getIndex(thing: Thing): number {
    return this.things.findIndex((t: Thing): boolean => t._id == thing._id);
  }

  private notification(message: string) {
    this.messageService.add({key: 'bl', severity: 'success', detail: message});
  }
}
