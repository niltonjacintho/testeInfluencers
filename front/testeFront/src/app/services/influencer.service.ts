import { Injectable } from '@angular/core';
import {
  InfluencerInterface,
  newInfluencerInterface,
} from '../models/influencer.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mockLocalData } from './mockLocalData';

@Injectable({
  providedIn: 'root',
})
export class InfluencerService {
  /* private _selectedInfluencer: InfluencerInterface = newInfluencerInterface(); */
  apiUrl = 'http://localhost:8000/influencer';
  getFromApi = true
  constructor(private http: HttpClient) { }

  /*  public get selectedInfluencer(): InfluencerInterface {
     return this._selectedInfluencer;
   }
   public set selectedInfluencer(value: InfluencerInterface) {
     this._selectedInfluencer = value;
   } */

  get InfluencerList(): Observable<InfluencerInterface[]> {
    if (this.getFromApi) {
      var a = this.http.get<InfluencerInterface[]>(this.apiUrl);
      console.log(a);
      return a;
    } else {
      return of(mockLocalData);
    }
  }
}
