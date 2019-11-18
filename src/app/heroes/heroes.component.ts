import { Component, OnInit } from '@angular/core';
import {Hero} from './hero.model';
import {HEROES} from './heroes.mock';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[] = HEROES;

  constructor() { }

  ngOnInit() {
  }

  onSelect(singleHero: Hero): void {
    this.selectedHero = singleHero;
  }
}
