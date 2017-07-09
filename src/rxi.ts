import { Observable } from 'rxjs';
import { RxiDB } from './rxi_db';

/**
 * Rxi entry point.
 */
export class Rxi {

  constructor(private name: string) {}

  /**
   * Specify database version.
   * When this Rxi instance already opened with the old version number, parameter: onUpgradeNeeded will be called.
   * (The upgradeneeded event occurs when you call the open function.)
   * @param ver database version.
   */
  version(ver: number = 1): object {
    return {
      open(onUpgradeNeeded?: (RxiDB) => any): Observable<RxiDB | ErrorEvent> {
        return this._open(ver, onUpgradeNeeded);
      }
    };
  }

  /**
   * Open IndexedDB.
   * This function is alias of 'Rxi.version(1)'
   * @param onUpgradeNeeded This function called by upgradeneeded event.
   */
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
