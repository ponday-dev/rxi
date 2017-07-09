import { Observable } from 'rxjs';

/**
 * The type alias that can use at the keypath in an object store.
 */
export type RxiKey = string|number|IDBKeyRange|Date|IDBArrayKey;

/**
 * The wrapper of IDBStore in IndexedDB.
 * Some async functions provide return value as  Observable.
 */
export class RxiStore {

  constructor(private store: IDBObjectStore) {}

  /**
   * Add value to this store.
   * @param value The value that you want to add to this store.
   * @param key (optional) The key value.
   */
  add(value: any, key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.add(value, key));
  }

  /**
   * Clear all values in this store.
   */
  clear(): Observable<Event | string> {
    return this._toObservable(this.store.clear());
  }

  /**
   * Count values related to specified key.
   * @param key The key value.
   */
  count(key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.count());
  }

  /**
   * Clear index.
   * @param name The index name that you want to clear.
   * @param keyPath The keyPath in index that you want to clear.
   * @param optionalParameters Optional parameters according to IDBIndexParameters.
   */
  cleateIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex {
    return this.store.createIndex(name, keyPath, optionalParameters);
  }

  /**
   * Delete store value.
   * @param key (optional) When you want to delete only a specific key, you specify this parameter.
   */
  delete(key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.delete(key));
  }

  /**
   * Delete Index.
   * @param indexName The index name that you want to delete.
   */
  deleteIndex(indexName: string) {
    return this.store.deleteIndex(indexName);
  }

  /**
   * Get values related to specific key.
   * @param key The key that you want to get value.
   */
  get(key: any): Observable<Event | string> {
    return this._toObservable(this.store.get(key));
  }

  /**
   * Get index details.
   * @param name The index name.
   */
  index(name: string): IDBIndex {
    return this.store.index(name);
  }

  /**
   * Put value to this store.
   * @param value The value that you want to add to this store.
   * @param key (optional) The key value.
   */
  put(value: any, key?: RxiKey): Observable<Event | string> {
    return this._toObservable(this.store.put(value, key));
  }

  /**
   * Open cursor.
   * @param range 
   * @param direction 
   */
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
