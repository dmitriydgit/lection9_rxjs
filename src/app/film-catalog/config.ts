import { InjectionToken } from '@angular/core';
import { FilmService } from './film.service';

export const constantes = {
	user: {
		login: 'ddd@gmail.com',
		password: '12345678'
	}
}

export const Constantes = new InjectionToken<FilmService>('qwerty');