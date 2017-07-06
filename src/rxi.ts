import { Observable } from 'rxjs';
import { RxiDB } from './rxi_db';

export class Rxi {

  constructor(private name: string) {}

  version(ver: number = 1): object {
    return {
      open(onUpgradeNeeded?: (RxiDB) => any): Observable<RxiDB | ErrorEvent> {
        return this._open(ver, onUpgradeNeeded);
      }
    };
  }

  open(onUpgradeNeeded?: (RxiDB) => any): object {
    return this._open(1, onUpgradeNeeded);
  }

  private _open(ver: number, onUpgradeNeeded?: (RxiDB) => any): Observable<RxiDB | ErrorEvent> {
    const promise = new Promise<RxiDB | ErrorEvent>((resolve, reject) => {
      let req = window.indexedDB.open(this.name, ver);

      const db = (<IDBRequest>event.target).result;
      if (onUpgradeNeeded) req.onupgradeneeded = (event) => {
        return onUpgradeNeeded(new RxiDB(db));
      };
      req.onsuccess = (event) => resolve(db);
      req.onerror = (event) => reject(event);
    });

    return Observable.fromPromise(promise);
  }

}
