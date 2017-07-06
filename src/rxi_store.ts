import { Observable } from 'rxjs';

type RxiKey = string|number|IDBKeyRange|Date|IDBArrayKey;
export class RxiStore {

  constructor(private store: IDBObjectStore) {}

  add(value: any, key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.add(value, key));
  }

  clear(): Observable<Event | string> {
    return this._toObservable(this.store.clear());
  }

  count(key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.count());
  }

  cleateIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex {
    return this.store.createIndex(name, keyPath, optionalParameters);
  }

  delete(key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.delete(key));
  }

  deleteIndex(indexName: string) {
    return this.store.deleteIndex(indexName);
  }

  get(key: any): Observable<Event | string> {
    return this._toObservable(this.store.get(key));
  }

  index(name: string): IDBIndex {
    return this.store.index(name);
  }

  put(value: any, key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.put(value, key));
  }

  openCursor(range?: RxiKey, direction?: string): Observable<Event | string> {
    return this._toObservable(this.store.openCursor(range, <IDBCursorDirection>direction));
  }

  private _toObservable(req: IDBRequest) {
    return Observable.fromPromise(this._promisify(req));
  }

  private _promisify(req: IDBRequest): Promise<Event | string> {
    return new Promise<Event>((resolve, reject) => {
          req.onsuccess = (event) => resolve(event);
          req.onerror = (event) => reject((<ErrorEvent>event).message);
    });
  }

}
