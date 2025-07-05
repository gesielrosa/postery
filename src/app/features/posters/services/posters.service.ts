import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PaginationParams, PaginationResponse, SortType } from '../../../shared/types';
import { Poster } from '../types';

export type PosterListResponse = PaginationResponse<Poster>;
export type PosterListParams = {
  sort?: SortType;
} & PaginationParams;
export type PosterDetailsResponse = Poster;

@Injectable({
  providedIn: 'root',
})
export class PostersService {
  private http = inject(HttpClient);

  public list(params: PosterListParams): Observable<PosterListResponse> {
    const queryParams = new URLSearchParams();
    queryParams.set('_page', params.page?.toString() ?? '');
    queryParams.set('_per_page', params.pageSize?.toString() ?? '');
    queryParams.set('_sort', params.sort === 'desc' ? '-id' : 'id');

    return this.http.get<PosterListResponse>(`${environment['apiUrl']}posters?${queryParams.toString()}`);
  }

  public details(id: string): Observable<PosterDetailsResponse> {
    return this.http.get<PosterDetailsResponse>(`${environment['apiUrl']}posters/${id}`);
  }

  public create(item: Poster): Observable<void> {
    return this.http.post<void>(`${environment['apiUrl']}posters`, item);
  }

  public update(item: Poster): Observable<void> {
    return this.http.put<void>(`${environment['apiUrl']}posters/${item.id}`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment['apiUrl']}posters/${id}`);
  }
}
