import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
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
import { MatInputModule } from '@angular/material';


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
		MatInputModule

	],
	declarations: [
		MainComponent,
		FilmsListComponent,
		FilmItemComponent,
		ActorItemComponent,
		SearchComponent
	]
})
export class FilmCatalogModule {
}
