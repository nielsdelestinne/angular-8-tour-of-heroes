import {TestBed} from '@angular/core/testing';

import {HeroService} from './hero.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {MessagesService} from './messages.service';

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  it('#getHeroes should return all heroes', () => {
    const service: HeroService = TestBed.get(HeroService);
    const messagesService: MessagesService = TestBed.get(MessagesService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

    spyOn(messagesService, 'add');

    const dummyHeroes = [
      { id: 1, name: 'Batmanski' },
      { id: 2, name: 'Spidermanski' }
    ];

    service.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);

    expect(messagesService.add).toHaveBeenCalled();
  });

});
