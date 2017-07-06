import { RxiTransaction } from './rxi_transaction';
import { RxiStore } from './rxi_store';

export class RxiDB {

  constructor(private db: IDBDatabase) { }

  store(keys: string[], mode: string): [RxiTransaction, RxiStore[]] {
    const transaction = this.db.transaction(keys, <IDBTransactionMode> mode);
    const stores = keys.map(key => new RxiStore(transaction.objectStore(key)));

    return [new RxiTransaction(transaction), stores];
  }

  createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): RxiStore {
    const store = this.db.createObjectStore(name, optionalParameters);
    return new RxiStore(store);
  }

  deleteObjectStore(name: string) {
    if (this.objectStoreNames.contains(name)) {
      this.db.deleteObjectStore(name);
    }
  }

  close() {
    this.db.close();
  }

  get objectStoreNames(): DOMStringList {
    return this.db.objectStoreNames;
  }

}
