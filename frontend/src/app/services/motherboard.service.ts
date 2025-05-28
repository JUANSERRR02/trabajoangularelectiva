import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MotherboardService {
  private apiUrl = environment.apiUrl + '/motherboard';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getOne(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(cpu: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cpu);
  }

  update(id: string, cpu: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cpu);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
