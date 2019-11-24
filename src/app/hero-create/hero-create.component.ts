import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../core/hero/hero.model';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit {

  @Output() newHero = new EventEmitter<Hero>();

  heroForm: FormGroup;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }


  create(): void {
    this.heroService.addHero({ name: this.heroForm.value.name.trim() } as Hero)
      .subscribe(hero => {
        this.newHero.emit(hero);
        this.heroForm.reset();
      });
  }

}
