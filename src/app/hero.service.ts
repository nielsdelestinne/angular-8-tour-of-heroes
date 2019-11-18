import { Injectable } from '@angular/core';
import {Hero} from './heroes/hero.model';
import {HEROES} from './heroes/heroes.mock';
import {Observable, of} from 'rxjs';
import {MessagesService} from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
