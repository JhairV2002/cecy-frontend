import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/notas';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root',
})
export class StudentsTableService {
  constructor(private http: HttpClient) { }

  personUrl: string = `http://localhost:8000/api/persona`;

  notasUrl: string = `http://localhost:8082/api/notas/`;

  getPersons() {
    return this.http.get(this.personUrl);
  }

  getPerson(id: number) {
    return this.http.get<Persona>(`${this.personUrl}/${id}`);
  }

  getInscriptions() {
    return this.http.get<Nota[]>(this.notasUrl);
  }

  updateInscriptions(inscription: Nota) {
    return this.http.put<Nota>(`${this.notasUrl}`, inscription);
  }
}
