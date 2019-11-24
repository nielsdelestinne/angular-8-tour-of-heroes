import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {

  let messageService: MessagesService;

  beforeEach(() => {
    messageService = new MessagesService();
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: MessagesService = TestBed.get(MessagesService);
    expect(service).toBeTruthy();
  });

  it('should allow to add a message', () => {
    const service: MessagesService = TestBed.get(MessagesService);
    service.add('This is my new message');

    expect(service.messages).toContain('This is my new message');
    expect(service.messages.length).toEqual(1);

  });

  it('should be created (no testbed)', () => {
    expect(messageService).toBeTruthy();
  });

  it('should allow to add a message (no testbed)', () => {
    messageService.add('This is my new message');

    expect(messageService.messages).toContain('This is my new message');
    expect(messageService.messages.length).toEqual(1);

  });
});
