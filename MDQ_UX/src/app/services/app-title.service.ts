import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  setTitle() {
    return this._activatedRoute.snapshot.routeConfig?.title;
  }
}
