import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
	selector: 'paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
	@Input() totalPages: string;
	@Output() pagEmitter: EventEmitter<any> = new EventEmitter();
	length = this.totalPages;
	pageSize = 20;
	pageSizeOptions: number[] = [20];


	// MatPaginator Output
	pageEvent: PageEvent;

	constructor() { }

	ngOnInit() {

	}

	setPageSizeOptions() {
		console.log(this.pageEvent)
		console.log(this.totalPages)
		this.pagEmitter.emit(this.pageEvent);
		//this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
	}

}
