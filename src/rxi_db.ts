import { RxiTransaction } from './rxi_transaction';
import { RxiStore } from './rxi_store';

/**
 * The wrapper of IDBDatabase on IndexedDB.
 * You can create / delete object stores, get transactions / stores, and close this database. 
 */
export class RxiDB {

  constructor(private db: IDBDatabase) { }

  /**
   * Get a transaction and stores.
   * @param keys The store names that you want to get transaction.
   * @param mode Open mode ('readwrite' / 'readonly' / 'versionchangetransaction')
   * @param needTransaction Need a transaction in returned value.
   * (When specified true, this function will return tuple that include a RxiTransaction instance.)
   */
  store(keys: string[], mode: string, needTransaction = false): [RxiTransaction, RxiStore[]] | RxiStore[] {
    const transaction = this.db.transaction(keys, <IDBTransactionMode> mode);
    const stores = keys.map(key => new RxiStore(transaction.objectStore(key)));

    return needTransaction ? [new RxiTransaction(transaction), stores] : stores;
  }

  /**
   * Create an object store.
   * @param name The store name.
   * @param optionalParameters Optional parameters according to IDBObjectStoreParameters.
   */
  createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): RxiStore {
    const store = this.db.createObjectStore(name, optionalParameters);
    return new RxiStore(store);
  }

  /**
   * Delete an object store.
   * @param name The store name.
   */
  deleteObjectStore(name: string) {
    if (this.objectStoreNames.contains(name)) {
      this.db.deleteObjectStore(name);
    }
  }

  /**
   * Close database.
   */
  close() {
    this.db.close();
  }

  /**
   * Get object store names.
   * This function return DOMStringList object.
   */
  get objectStoreNames(): DOMStringList {
    return this.db.objectStoreNames;
  }

}
