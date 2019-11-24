export interface Page<T> {

  navigateTo(): T;
  assertOnPage(): void;

}
