import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroService} from './hero/hero.service';
import {MessagesService} from './messages/messages.service';
import {InMemoryDataService} from './mock/in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HeroService,
    MessagesService,
    InMemoryDataService
  ]
})
export class CoreModule { }
