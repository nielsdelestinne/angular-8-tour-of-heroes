import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Hero} from '../core/hero/hero.model';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../core/hero/hero.service';
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
  showComponent = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {
  }

  ngOnInit() {
    if (!this.hero) {
      this.getHero();
    } else {
      this.createForm();
    }
  }

  private createForm() {
    this.heroUpdateForm = new FormGroup({
      name: new FormControl(this.hero.name, [Validators.required, Validators.minLength(2)])
    });
  }

  private getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.createForm();
      });
  }

  update(): void {
    const hero = {id: this.hero.id, name: this.heroUpdateForm.value.name};
    this.heroService.updateHero(hero)
      .subscribe(() => {
        this.showComponent = false;
        this.heroUpdateForm.reset();
        this.updatedHero.emit(hero);
        if (this.showGoBackButton) {
          this.goBack();
        }
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
