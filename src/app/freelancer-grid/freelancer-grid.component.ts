import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IFreelancer, ACTIONS } from './freelancers.reducer';
import { IFilter, ACTIONS as FilterActions } from '../filter/filter-reducer';
// import * as Rx from 'RxJS';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {RealtimeFreelancersService} from '../freelancer.service';

@Component({
  selector: 'app-freelancer-grid',
  templateUrl: './freelancer-grid.component.html',
  styleUrls: ['./freelancer-grid.component.css']
})
export class FreelancerGridComponent implements OnInit {
  public freelancers: Observable<Array<IFreelancer>>;
  public filter: Observable<IFilter>;

  constructor(private store: Store<AppState>, private service: RealtimeFreelancersService) {
    //this.freelancers = store.select('freelancers');
    this.freelancers = Observable.combineLatest(store.select('freelancers'), store.select('filter'), this.applyFilter);
    this.service.run();
  }

  applyFilter(freelancers: Array<IFreelancer>, filter: IFilter): Array<IFreelancer> {
    return freelancers
      .filter(x => !filter.name || x.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1)
      .filter(x => !filter.email || x.email.toLowerCase().indexOf(filter.email.toLowerCase()) != -1);
  }

  ngOnInit() {
  }

  delete(freelancer) {
    this.store.dispatch({
      type: ACTIONS.DELETE_FREELANCER,
      payload: freelancer,
    });
  }

}
