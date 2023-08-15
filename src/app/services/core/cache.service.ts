import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cachedCareers: any[] = [];
  private cachedCourses: any[] = [];
  private cachedMenu: any[] = [];
  constructor() { }

  setCachedCareers(careers: any[]) {
    this.cachedCareers = careers;
  }

  getCachedCareers() {
    return this.cachedCareers;
  }

  setCachedCourses(courses: any[]) {
    this.cachedCourses = courses;
  }

  getCachedCourses() {
    return this.cachedCourses;
  }

  setCachedMenu(menu: any[]) {
    this.cachedMenu = menu;
  }

  getCachedMenu() {
    return this.cachedMenu;
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearCache() {
    localStorage.clear();
  }
}
