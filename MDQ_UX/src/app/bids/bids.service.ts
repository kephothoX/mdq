import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

import { ErrorService } from '../error/error.service';
import { Observable, catchError, of} from 'rxjs';

import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class BidsService {

  constructor(
    private _errorService: ErrorService,
    private _appService: AppService,
    private _httpClient: HttpClient,
  ) {  }


  getAllItems(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/items`, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  getItemByID(id: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/item`, id, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  submitTopicMessage(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/topics/message`, data, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

  subscribeToTopic(topicId: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/topic/subscribe`, topicId, this._appService.httpOptionsPlainForm).pipe(catchError(this._errorService.handleError));
  }

}
