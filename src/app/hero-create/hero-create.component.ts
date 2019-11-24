import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../heroes/hero.model';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit {

  @Output() newHero = new EventEmitter<Hero>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }


  create(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.newHero.emit(hero);
        // this.heroes.push(hero);
      });
  }

}
