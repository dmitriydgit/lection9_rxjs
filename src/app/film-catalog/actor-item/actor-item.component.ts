import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-actor-item',
	templateUrl: './actor-item.component.html',
	styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {

	@Input() actor;
	@Input() counter;
	@Input() imgPath;

	constructor() { }

	ngOnInit() {
	}

}
