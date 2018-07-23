import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { SearchAPIComponent } from './searchByAPI/searchAPI.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilmItemComponent } from './film-item/film-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorItemComponent } from './actor-item/actor-item.component';
import { SearchComponent } from './search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { constantes, Constantes } from './config';
import { FilmService } from './film.service';
import { DEFAULT_SETTINGS, constantes } from './config';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator/paginator.component';





@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatGridListModule,
		MatSelectModule,
		MatToolbarModule,
		HttpClientModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		NgProgressModule,
		HttpModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		MatPaginatorModule


	],
	declarations: [
		MainComponent,
		FilmsListComponent,
		FilmItemComponent,
		ActorItemComponent,
		SearchComponent,
		SearchAPIComponent,
		PaginatorComponent,
		PaginatorComponent

	],
	providers: [
		FilmService,
		{ provide: DEFAULT_SETTINGS, useValue: constantes }
	]
})
export class FilmCatalogModule {
}
