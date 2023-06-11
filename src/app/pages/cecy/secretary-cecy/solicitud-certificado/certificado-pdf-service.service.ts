import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificado } from './certificado';

@Injectable({
  providedIn: 'root'
})
export class CertificadoPdfServiceService {

  constructor(
    private http: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }
  private url: string = "http://localhost:8080/api/certificado";

  public findAll(): Observable<Certificado[]> {
    return this.http.get<Certificado[]>(
      this.url + '/',
      this.httpOptions
    );
  }

  public findById(id: number): Observable<Certificado>{
    return this.http.get<Certificado>(this.url+"/"+id+"/", this.httpOptions);
  }

  public save(generarCertificado: Certificado): Observable<Certificado>{
    console.log(generarCertificado);
    return this.http.post<Certificado>(this.url+"/", generarCertificado);
  }

  public descarga(id: number) {
    return this.http.get(this.url+"/pdf/"+id+"/",{responseType:'blob'});
  }
}
