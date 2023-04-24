import { Injectable } from '@angular/core';

export class InmemoryStorage {
  data: { [key: string]: string } = {};

  setItem(key: string, data: any) {
    this.data[key] = String(data);
  }

  getItem(key: string) {
    return this.data[key] || null;
  }

  deleteItem(key: string) {
    delete this.data[key];
  }
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  prefix: string = 'app';
  storage: any = null;
  constructor() {
    this.storage = window.localStorage || new InmemoryStorage();
  }

  private generateKey(key: string) {
    return this.prefix + '_' + key;
  }

  get(key: string) {
    return JSON.parse(this.storage.getItem(this.generateKey(key)));
  }

  set(key: string, data: any) {
    this.storage.setItem(this.generateKey(key), JSON.stringify(data));
  }

  remove(key: string) {
    this.storage.removeItem(this.generateKey(key));
  }
}
