import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

import { ErrorService } from '../error/error.service';
import { Observable, catchError, of} from 'rxjs';

import { AppService } from '../app.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(
    private _errorService: ErrorService,
    private _appService: AppService,
    private _httpClient: HttpClient,
  ) {  }


  newItem(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/items/new`, data).pipe(catchError(this._errorService.handleError));
  }


}
