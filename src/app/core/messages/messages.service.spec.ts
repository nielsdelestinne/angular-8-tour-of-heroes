import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

/**
 * Testing without TestBed is perfectly fine...
 */
describe('MessagesService', () => {

  let messageService: MessagesService;

  beforeEach(() => {
    messageService = new MessagesService();
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('should add a new message', () => {
    messageService.add('This is my new message');

    expect(messageService.messages).toContain('This is my new message');
    expect(messageService.messages.length).toEqual(1);

  });

  it('should clear messages', () => {
    messageService.add('One message');

    messageService.clear();

    expect(messageService.messages.length).toBe(0);
  });

});
