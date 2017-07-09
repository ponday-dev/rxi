import { Observable } from 'rxjs';

/**
 * The wrapper of IDBTransaction in IndexedDB.
 */
export class RxiTransaction {

  private _complete$: Observable<{}>;
  private _error$: Observable<{}>;

  constructor(private transaction: IDBTransaction) { }

  /**
   * The event stream of complete.
   */
  get complete$ (): Observable<{}> {
    if (!this._complete$) {
      this._complete$ = Observable.fromEvent(this.transaction, 'complete').first();
    }
    return this._complete$;
  }

  /**
   * The event stream of error.
   */
  get error$ (): Observable<{}> {
    if (!this._error$) {
      this._error$ = Observable.fromEvent(this.transaction, 'error').first();
    }
    return this._error$;
  }

}
