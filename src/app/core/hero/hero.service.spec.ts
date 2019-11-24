import {TestBed} from '@angular/core/testing';

import {HeroService} from './hero.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MessagesService} from '../messages/messages.service';
import {Hero} from './hero.model';

describe('HeroService', () => {

  let heroService: HeroService;
  let messageService: MessagesService;
  let httpMock: HttpTestingController;

  const dummyHeroes = [
    {id: 1, name: 'Batmanski'},
    {id: 2, name: 'Spidermanski'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    heroService = TestBed.get(HeroService);
    messageService = TestBed.get(MessagesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('getHeroes should return all heroes', () => {
    spyOn(messageService, 'add');

    heroService.getHeroes()
      .subscribe(heroes => {
        expect(heroes.length).toBe(2);
        expect(heroes).toEqual(dummyHeroes);
      });

    const httpRequest = stubHTTPGetAllHeroesToReturnDummyHeroes();
    expect(httpRequest.request.method).toBe('GET');
    expect(messageService.add).toHaveBeenCalled();
  });

  it('getHero should return the hero found for the given id', () => {
    spyOn(messageService, 'add');

    heroService.getHero(1)
      .subscribe(hero => {
        expect(hero).toEqual(dummyHeroes[0]);
      });

    const httpRequest = stubHTTPGetHeroToReturnHeroForId1();
    expect(httpRequest.request.method).toBe('GET');
    expect(messageService.add).toHaveBeenCalled();
  });

  it('updateHero should update the hero with the updated information', () => {
    spyOn(messageService, 'add');
    const updatedHero = {id: 1, name: 'Batmanana'};

    heroService.updateHero(updatedHero)
      .subscribe(hero => {
        expect(hero).toEqual(updatedHero);
      });

    const httpRequest = stubHTTPPutOrPostHero(updatedHero);
    expect(httpRequest.request.method).toBe('PUT');
    expect(messageService.add).toHaveBeenCalled();
  });

  it('addHero should add the new hero to all heroes', () => {
    spyOn(messageService, 'add');
    const newHero = {id: 3, name: 'Wonderwomanski'};

    heroService.addHero(newHero)
      .subscribe(hero => {
        expect(hero).toEqual(newHero);
      });

    const httpRequest = stubHTTPPutOrPostHero(newHero);
    expect(httpRequest.request.method).toBe('POST');
    expect(messageService.add).toHaveBeenCalled();
  });

  it('searchHero should return the heroes matching the search criteria', () => {
    spyOn(messageService, 'add');

    heroService.searchHeroes('bat')
      .subscribe(heroes => {
        expect(heroes.length).toBe(1);
        expect(heroes[0]).toEqual(dummyHeroes[0]);
      });

    const httpRequest = stubHTTPSearchHero('bat');
    expect(httpRequest.request.method).toBe('GET');
    expect(messageService.add).toHaveBeenCalled();
  });

  it('searchHero should return an empty result if an empty search criteria is provided', () => {
    spyOn(messageService, 'add');

    heroService.searchHeroes('wolv')
      .subscribe(heroes => {
        expect(heroes.length).toBe(0);
      });

    httpMock.expectNone(`api/heroes/?name=`);
    expect(messageService.add).toHaveBeenCalledTimes(0);
  });

  function stubHTTPSearchHero(searchCriteria: string) {
    const httpRequest = httpMock.expectOne(`api/heroes/?name=${searchCriteria}`);
    httpRequest.flush([dummyHeroes[0]]);
    return httpRequest;
  }

  function stubHTTPPutOrPostHero(hero: Hero) {
    const httpRequest = httpMock.expectOne('api/heroes');
    httpRequest.flush(hero);
    return httpRequest;
  }

  function stubHTTPGetHeroToReturnHeroForId1() {
    const httpRequest = httpMock.expectOne('api/heroes/1');
    httpRequest.flush(dummyHeroes[0]);
    return httpRequest;
  }

  function stubHTTPGetAllHeroesToReturnDummyHeroes() {
    const httpRequest = httpMock.expectOne('api/heroes');
    httpRequest.flush(dummyHeroes);
    return httpRequest;
  }

});
