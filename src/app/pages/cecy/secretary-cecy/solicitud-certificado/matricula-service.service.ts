import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from './matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaServiceService {

  constructor(
    private http: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }
  private url: string = "http://localhost:8089/api/matricula"
  public findAll(): Observable<Matricula[]>{
    return this.http.get<Matricula[]>(this.url+"/", this.httpOptions);
  }
  public findById(id: number): Observable<Matricula>{
    return this.http.get<Matricula>(this.url+"/"+id+"/", this.httpOptions);
  }
}
