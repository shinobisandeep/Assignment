import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseurl="http://localhost:3000/user";
  constructor(private http:HttpClient) { }

  GetUser(){
  return this.http.get(this.baseurl);
  }
}
