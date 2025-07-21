import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list'; // ✅ Paso 1: importar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CharacterListComponent // ✅ Paso 2: añadir al array de imports
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'rick-and-morty-angular-v20';
}