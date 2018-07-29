import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilmService } from '../film.service';
import { BookAndFavService } from '../bookAndFav.service';
import { Film } from '../../film';
import { User } from '../../user';
import { Observable, of, from, fromEvent, range } from 'rxjs';
import { pluck, map, findIndex, filter, defaultIfEmpty, tap, take } from 'rxjs/operators';


@Component({
	selector: 'searchAPI',
	templateUrl: './searchAPI.component.html',
	styleUrls: ['./searchAPI.component.css']
})
export class SearchAPIComponent implements OnInit {
	//@Output() searchEmitter = new EventEmitter()

	value: string;
	items: any;
	searchingArray: any;
	imgPath: string = this.filmsService.midImgPath;
	searchString: string;
	searching: boolean = false;
	sortOption: any = 'Films';
	dataCategory: any = "films"
	pageCounter: number = 1;
	user: User = {
		login: 'ddd@gmail.com',
		password: '12345678'
	};
	sortOptions = [
		{ value: 'Films', description: 'Фильмы' },
		{ value: 'Actors', description: 'Актеры' }
	];

	constructor(public filmsService: FilmService, public bookAndFavService: BookAndFavService) { }

	ngOnInit() {

	}


	doSearch(searchString: string) {
		console.log(searchString);
		if (searchString.length > 2) {
			console.log(this.sortOption)
			if (this.sortOption === 'Films') {
				this.filmsService.searchData(searchString, this.dataCategory, this.pageCounter)
					.subscribe(
						(filmList: any) => {
							this.items = [...filmList.results];
							this.getFavarites();
							this.getBookmarks();
						})
			}
			if (this.sortOption === 'Actors') {
				this.filmsService.searchActors(searchString).subscribe(
					(actorList: any) => {
						this.items = [...actorList.results];
					})
			}

		} else {
			this.items = [];
		}
	}


	getFavarites() {
		this.bookAndFavService.getFavorites(this.items.map(item => item.id)).subscribe(
			(favorites: any) => {
				let favoriteList = favorites.map(favorite => favorite._id);
				this.items.forEach(film => {
					film.isFavorite = favoriteList.indexOf(film.id) > -1;
				})

			},
			err => {
				console.log("Favorits request error")
			})
	}

	getBookmarks() {
		this.bookAndFavService.getBookmarks(this.items.map(item => item.id)).subscribe(
			(bookmarks: any) => {
				let bookmarksList = bookmarks.map(bookmark => bookmark._id);
				this.items.forEach(film => {
					film.isBookmark = bookmarksList.indexOf(film.id) > -1;
				})
			},
			err => {
				console.log("Bookmarks equest error")
			})
	}

	makeFavorite(film: Film) {
		film.isFavorite = !film.isFavorite;
		if (film.isFavorite) {
			this.bookAndFavService.addFilmToFavorite(film.id, this.user.login);
		} else {
			this.bookAndFavService.removeFromFavorite(film.id);
		}

	}

	makeBookmark(film: Film) {
		film.isBookmark = !film.isBookmark;
		if (film.isBookmark) {
			this.bookAndFavService.addFilmToBookmark(film.id, this.user.login);
		} else {
			this.bookAndFavService.removeFromBookmark(film.id);
		}
		//let bookmarkFilms = this.items.filter(item => item.isBookmark);
		//this.bookmarkFilmsCount = bookmarkFilms.length;
	}


	choseWhatToShow() {
		console.log(this.sortOption)
		if (this.sortOption === "Films") {
			this.items = [];

		}
		if (this.sortOption === "Actors") {
			this.items = [];
		}



	}


	// doSearch(searchString) {
	// 			this.searching = false;
	// 			if(searchString.length !== 0 && searchString.length > 2) {
	// 		this.searching = true;
	// 		this.items = [...this.searchingArray.filter(el => {
	// 			let srchFld = el.title ? el.title : el.name;
	// 			return srchFld.toLowerCase().includes(searchString.toLowerCase())
	// 		})]
	// 	}
	// 	if (searchString.length == 0) {
	// 		this.searching = false;
	// 		this.items = [...this.searchingArray];
	// 	}
	// }



	// observable = Observable.create(function (observer) {
	// 	// принимает как аргумент наблюдателя (observer)
	// 	observer.next('Hello');  // синхронная передача данных в поток
	// 	setTimeout(() => {
	// 		observer.next('World'); // асинхронная передача данных в поток
	// 		observer.complete(); // завершение потока
	// 	}, 2 * 1000);
	// });

	//observable = of(1, 2, 'Hello');

	// observable = fromEvent(document.querySelector('button'), 'click');
	//observable = range(3, 4);

	// observable = from([
	// 	{ id: 1, user: { name: 'Alex', lname: 'Smith' } },
	// 	{ id: 2, user: { name: 'John', lname: 'Doe' } }
	// ])
	// 	.pipe(
	// 		// map(element => element.user.name),
	// 		pluck('user', 'lname'),
	// 		map(name => name.toString().toUpperCase())
	// 	).subscribe(
	// 		word => console.log(word), // при next()
	// 		error => console.log(error), // при ошибке
	// 		() => console.log('Complete.') // при завершение
	// 	);

	// observable = from(['Hello', 'World', 3, 4, 5])
	// 	.pipe(findIndex(x => x === 'World'))
	// 	.subscribe(x => console.log(x));

	// subscription = this.observable.subscribe(
	// 	word => console.log(word), // при next()
	// 	error => console.log(error), // при ошибке
	// 	() => console.log('Complete.') // при завершение
	// );


	// observable = range(1, 7)
	// 	.pipe(filter(x => x % 2 === 0))
	// 	.subscribe(x => console.log(x))


	// observable = of() // empty value
	// .pipe(defaultIfEmpty('and now not empty'))
	// .subscribe(x => console.log(x)); // and now not empty


	// observable = from([1, 2, 3])
	// 	.pipe(tap(x => console.log("from tap", x * x))) // 1, 4, 9 - side effect
	// 	.subscribe(x => console.log("from subscription", x)); // 1, 2, 3 - original value



	observable = from([1, 2, 3, 4, 5, 6, 7])
		.pipe(take(3))
		.subscribe(x => console.log(x)); // 1, 2, 3




}


/**
 * @title Input with a clear button
 */
