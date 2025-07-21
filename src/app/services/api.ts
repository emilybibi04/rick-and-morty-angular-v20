import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly API_URL: string = 'https://rickandmortyapi.com/api/character';

  private readonly http = inject(HttpClient);

  // Señal privada para manejar el estado de los personajes
  private charactersSignal = signal<Character[]>([]);

  // Señal pública de solo lectura
  public readonly characters = this.charactersSignal.asReadonly();

  // Obtener todos los personajes
  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }

  // Buscar personajes por nombre
  searchCharacters(name: string): Observable<ApiResponse> {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      return this.getCharacters(); // Retorna todos si no se escribió nada
    }

    const searchUrl = `${this.API_URL}?name=${encodeURIComponent(trimmedName)}`;

    return this.http.get<ApiResponse>(searchUrl).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }
}