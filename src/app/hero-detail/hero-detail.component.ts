import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Hero} from '../heroes/hero.model';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnChanges {

  @Input() hero: Hero;
  @Input() showGoBackButton = true;
  @Output() updatedHero = new EventEmitter<Hero>();

  heroUpdateForm: FormGroup;
  showComponent: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {
  }

  ngOnInit() {
    if (!this.hero) {
      this.getHero();
    }
    this.heroUpdateForm = new FormGroup({
      name: new FormControl(this.hero.name, [Validators.required, Validators.minLength(2)])
    });
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  update(): void {
    const hero = {id: this.hero.id, name: this.heroUpdateForm.value.name};
    this.heroService.updateHero(hero)
      .subscribe(() => {
        this.showComponent = false;
        this.heroUpdateForm.reset();
        this.updatedHero.emit(hero);
        // this.goBack();
      });
  }


  goBack() {
    this.location.back();
  }

  ngOnChanges(): void {
    this.showComponent = true;
    if (this.heroUpdateForm) {
      this.heroUpdateForm.setValue({name: this.hero.name});
    }
  }
}
