import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Method to save data to local storage
  save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Method to retrieve data from local storage
  get(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
