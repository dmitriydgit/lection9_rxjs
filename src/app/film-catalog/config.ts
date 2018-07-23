import { InjectionToken } from '@angular/core';
import { FilmService } from './film.service';

export const constantes = {
	user: {
		login: 'ddd@gmail.com',
		password: '12345678'
	}
}

export const DEFAULT_SETTINGS = new InjectionToken<FilmService>('qwerty');