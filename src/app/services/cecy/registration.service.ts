import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonCecy } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url: string = 'http://localhost:8000/api/persona'; //api yavirac
  private urlCecy: string = 'http://localhost:8080/api/estudiantes';

  public save(personCecy: PersonCecy): Observable<PersonCecy> {
    return this.http.post<PersonCecy>(`${this.urlCecy}/`, personCecy, this.httpOptions);
  }

  public findById(id: number): Observable<PersonCecy> {
    return this.http.get<PersonCecy>(`${this.url}/${id}`, this.httpOptions);
  }

  public findAll(): Observable<PersonCecy[]> {
    return this.http.get<PersonCecy[]>(`${this.url}/`, this.httpOptions);
  }

  public findByCedula(cedula: String): Observable<PersonCecy[]> {
    return this.http.get<PersonCecy[]>(`${this.url}?cedula=${cedula}`, this.httpOptions);
  }

}
