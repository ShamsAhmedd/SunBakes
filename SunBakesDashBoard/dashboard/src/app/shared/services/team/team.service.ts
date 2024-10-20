import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:5002/api/team';

  constructor(private _HttpClient: HttpClient) { }

  addTeam(team: FormData): Observable<any> {
    return this._HttpClient.post(this.apiUrl, team);
  }

  getTeam(): Observable<any> {
    return this._HttpClient.get(this.apiUrl);
  }

  updateTeam(team: FormData, id: string): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${id}`);
  }
}
