import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CatalogueUser } from '@models/core/authentication';

@Injectable({
  providedIn: 'root',
})
export class CatalogueUserService {
  private apiUrl = `${environment.api2}/catalogues`;
  constructor(private http: HttpClient) {}

  getCatalogue() {
    return this.http.get<CatalogueUser[]>(`${this.apiUrl}`);
  }
}
