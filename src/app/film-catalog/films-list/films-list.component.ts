import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';
import { ActorItemComponent } from '../actor-item/actor-item.component';
import { SearchComponent } from '../search/search.component';

@Component({
	selector: '.films',
	templateUrl: './films-list.component.html',
	styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
	items: any;
	sortOption: any = 'Films';
	counter: number = 1;
	favoriteFilmsCount: number = 0;
	outerFilms: any;
	imgPath: string = this.filmsService.midImgPath;
	searchString: string;
	searching: boolean = false;
	searchingArray: any;

	sortOptions = [
		{ value: 'Films', description: 'Фильмы' },
		{ value: 'Actors', description: 'Актеры' }
	];

	// Получаем доступ к дочернему компоненту напрямую используя ViewChild
	@ViewChild(FilmItemComponent) filmItem: FilmItemComponent;

	// Получаем доступ к списку дочерних компонентов напрямую используя ViewChildred
	@ViewChildren(FilmItemComponent) films: QueryList<FilmItemComponent>;


	constructor(public filmsService: FilmService) {
	}

	ngOnInit() {
		console.log("Hook Parent, Инициализация родительского компонента")
		//console.log(this.imgPath)
		this.getFilms()
	}

	ngAfterViewInit() {
		console.log("Hook Parent, Все дочерние компоненты отрендерены");
	}

	directUpdateChildren() {
		console.log("вызываем логику дочернего компонента напрямую");
		let result = this.filmItem.showFilmInfo();
		console.log(result);
	}

	directUpdateAllChildren() {
		console.log("вызываем логику в каждом дочернем компоненте")
		this.films.forEach(item => {
			item.showFilmInfo();
		});
	}

	count() {
		this.counter++;
	}

	getFilms() {
		this.filmsService.getPopularFilms(this.counter).subscribe(
			(filmList: any) => {
				//console.log(`${this.filmsService.midImgPath}${filmList.results[2].poster_path}`)
				this.items = [...filmList.results];
				this.searchingArray = [...filmList.results];
			},
			err => {
				console.log("error");
			})
	}

	getActors() {
		this.filmsService.getPopularActors(this.counter).subscribe(
			(actorsList: any) => {
				//console.log(`${this.filmsService.midImgPath}${actorsList.results[2].poster_path}`)
				this.items = [...actorsList.results];
				this.searchingArray = [...actorsList.results];
				console.log(this.searchingArray)
			},
			err => {
				console.log("error");
			})
	}

	choseWhatToShow() {
		console.log(this.sortOption)
		if (this.sortOption === "Films") {
			this.items = [];
			this.getFilms();
		}
		if (this.sortOption === "Actors") {
			this.items = [];
			this.getActors();

		}
	}

	makeStar(film: Film) {
		film.isFavorite = !film.isFavorite;
		let favoriteFilms = this.items.filter(item => item.isFavorite);
		this.favoriteFilmsCount = favoriteFilms.length;
	}

	setNextPage() {
		this.counter++;
		this.choseWhatToShow();
	}

	doSearch(searchString) {
		if (searchString.length !== 0 && searchString.length > 2) {
			this.searching = true;
			this.items = [...this.searchingArray.filter(el => {
				let srchFld = el.title ? el.title : el.name;
				return srchFld.toLowerCase().includes(searchString.toLowerCase())
			})]
		}
		if (searchString.length == 0) {
			this.searching = false;
			this.items = [...this.searchingArray];
			//this.choseWhatToShow();
		}
	}
	// sortFilmCards() {
	// 	this.filmsData = (this.sortOption === "default")
	// 		? this.getFilms()
	// 		: this.sortFilms(this.filmsData, this.sortOption);
	// }

	// sortFilms(arr, numDirect: number): Film[] {
	// 	return arr.sort((a, b) => {
	// 		let x = a.title.toLowerCase();
	// 		let y = b.title.toLowerCase();
	// 		if (x < y) { return -1 * numDirect; }
	// 		if (x > y) { return numDirect; }
	// 		return 0;
	// 	})
	// }

}
