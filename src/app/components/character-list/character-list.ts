import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { Api } from '../../services/api';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule   
  ],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.scss']
})
export class CharacterListComponent implements OnInit {
  // Inyección del servicio
  private readonly api = inject(Api);

  // Conectar la señal pública de personajes
  public characters = this.api.characters;

  // Estado de la UI
  public searchTerm: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';

  // Señal computada que verifica si hay personajes
  public hasCharacters = computed(() => this.characters().length > 0);

  ngOnInit(): void {
    this.loadInitialCharacters();
  }

  loadInitialCharacters(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getCharacters().pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {},
      error: () => {
        this.errorMessage = 'No se pudieron cargar los personajes. Intenta nuevamente.';
      }
    });
  }

  onSearch(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.searchCharacters(this.searchTerm).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {},
      error: () => {
        this.errorMessage = 'No se encontraron resultados para la búsqueda.';
      }
    });
  }

  onSearchKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}