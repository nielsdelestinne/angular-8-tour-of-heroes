import {Component, OnInit} from '@angular/core';
import {Hero} from '../core/hero/hero.model';
import {HeroService} from '../core/hero/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(singleHero: Hero): void {
    this.selectedHero = singleHero;
  }

  addHeroToHeroes(newHero: Hero) {
    this.heroes.push(newHero);
  }

  updateHero(updatedHero: Hero) {
    const indexOfHeroToUpdate = this.heroes
      .map(hero => hero.id)
      .indexOf(updatedHero.id);
    this.heroes[indexOfHeroToUpdate] = updatedHero;
  }
}
