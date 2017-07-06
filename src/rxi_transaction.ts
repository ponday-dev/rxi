import { Observable } from 'rxjs';

export class RxiTransaction {

  private _complete$: Observable<{}>;
  private _error$: Observable<{}>;

  constructor(private transaction: IDBTransaction) { }

  get complete$ (): Observable<{}> {
    if (!this._complete$) {
      this._complete$ = Observable.fromEvent(this.transaction, 'complete').first();
    }
    return this._complete$;
  }

  get error$ (): Observable<{}> {
    if (!this._error$) {
      this._error$ = Observable.fromEvent(this.transaction, 'error').first();
    }
    return this._error$;
  }

}
