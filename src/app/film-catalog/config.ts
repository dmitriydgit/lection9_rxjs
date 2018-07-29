import { InjectionToken } from '@angular/core';
import { FilmService } from './film.service';

export const constantes = {
	user: {
		login: 'ddd@gmail.com',
		password: '12345678'
	},

	APIs: {
		apiUrl: "https://api.themoviedb.org/3",
		apiKey: '0994e7679a856150aadcecf7de489bce',
		apiKeyAct: '434343434',
		imgPath: 'https://image.tmdb.org/t/p',
	}


}

export const DEFAULT_SETTINGS = new InjectionToken<FilmService>('qwerty');