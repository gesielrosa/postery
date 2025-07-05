import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { debounceTime, finalize } from 'rxjs';

import { SortType } from '../../../../shared/types';
import { setQueryParams } from '../../../../shared/utils';
import { ButtonComponent } from '../../../../ui/button';
import { MasonryGridComponent, MasonryGridItemActionComponent, MasonryGridItemComponent } from '../../../../ui/masonry-grid';
import { PosterListParams, PostersService } from '../../services';
import { Poster } from '../../types';

@Component({
  selector: 'app-list',
  imports: [MasonryGridComponent, MasonryGridItemComponent, MasonryGridItemActionComponent, ButtonComponent, RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private service = inject(PostersService);
  private activatedRoute = inject(ActivatedRoute);
  private setQueryParams = setQueryParams();
  private toast = inject(HotToastService);

  protected params = signal<PosterListParams>({});
  protected loading = signal<boolean>(true);
  protected items = signal<Poster[]>([]);
  protected hasNextPage = signal<boolean>(false);

  public ngOnInit(): void {
    // NOTE: Is not necessary to unsubscribe from this subscription because it will
    // be automatically unsubscribed when the component is destroyed
    this.activatedRoute.queryParams.pipe(debounceTime(500)).subscribe(({ page, pageSize, sort }) => {
      this.params.set({
        page: Number(page || 1),
        pageSize: Number(pageSize || 12),
        sort: (sort as SortType) || 'asc',
      });

      this.listItems();
    });
  }

  protected loadMore() {
    this.loading.set(true);
    this.setQueryParams.set({ page: (this.params()?.page || 1) + 1 });
  }

  protected onSortChange() {
    this.loading.set(true);
    const sort = this.params()?.sort === 'asc' ? 'desc' : 'asc';
    this.items.set([]);
    this.hasNextPage.set(false);
    this.setQueryParams.set({ sort, page: 1 });
  }

  private listItems(): void {
    this.loading.set(true);
    this.service
      .list(this.params())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          if (response?.data) {
            this.hasNextPage.set(!!response.next);
            this.items.update((items = []) => [...items, ...response?.data]);
          }
        },
        error: () => {
          this.toast.error('Não conseguimos carregar os posters. Tente novamente mais tarde.');
        },
      });
  }
}
