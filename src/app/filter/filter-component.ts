import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import * as Rx from 'rxjs';

import { IFilter, ACTIONS as FilterACTIONS } from './filter-reducer';

@Component({
    selector: 'app-filter',
    templateUrl: 'filter-component.html',
    // styleUrls: ['./filter-component.css']
})
export class FilterComponent implements OnInit {
    public name = new FormControl();
    public email = new FormControl();
    constructor(private store: Store<any>) {
        store.select('filter').subscribe((filter: IFilter) => {
            this.name.setValue(filter.name);
            this.email.setValue(filter.email);
        });
        Rx.Observable.merge(this.name.valueChanges, this.email.valueChanges).debounceTime(1000).subscribe(() => this.filter());

    }

    ngOnInit() {
    }

    filter() {
        this.store.dispatch({
            type: FilterACTIONS.UPDATE_FILTER,
            payload: {
                name: this.name.value,
                email: this.email.value,
            }
        });
    }

    clearFilter() {
        this.store.dispatch({
            type: FilterACTIONS.CLEAR_FILTER,
        });
    }

}