import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  private url: string = "http://localhost:8080/api/estudiantes"
  //obtener lista de persona
  public findAll(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url+"/", this.httpOptions);
  }
  public findById(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.url+"/"+id+"/", this.httpOptions);
  }


}
