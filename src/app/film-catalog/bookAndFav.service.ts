import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
	providedIn: 'root'
})

export class BookAndFavService {

	constructor(private http: HttpClient) {

	}

	localApiUrl: string = 'http://localhost:3000/';
	favoriteApiUrl: string = this.localApiUrl + 'films/favorites';
	bookmarkApiUrl: string = this.localApiUrl + 'films/bookmarks';

	filmsFavoriteList: Array<number> = [];
	filmsBookmarkList: Array<number> = [];
	actorsFavoriteList: Array<number> = [];

	getFavorites(ids: Array<number>) {
		return this.http.get(`${this.favoriteApiUrl}?filmIds=${ids.join(',')}`)
	}

	getBookmarks(ids: Array<number>) {
		return this.http.get(`${this.bookmarkApiUrl}?filmIds=${ids.join(',')}`)
	}

	addFilmToFavorite(id: number, user: string) {
		this.filmsFavoriteList.push(id);
		return this.http.post(this.favoriteApiUrl, { filmId: id, user: user }).subscribe(
			(res: any) => {
				console.log("Favorite done!")
			});
	}

	addFilmToBookmark(id: number, user: string) {
		this.filmsBookmarkList.push(id);
		return this.http.post(this.bookmarkApiUrl, { filmId: id, user: user }).subscribe(
			(res: any) => {
				console.log("Bookmark done!")
			});
	}

	removeFromFavorite(id: number) {
		return this.http.delete(`${this.localApiUrl}films/${id}/favorites`).subscribe(
			(res: any) => {
				console.log("Removed!")
			});
	}

	removeFromBookmark(id) {
		return this.http.delete(`${this.localApiUrl}films/${id}/bookmarks`).subscribe(
			(res: any) => {
				console.log("Removed!")
			});
	};

}