import { Component, OnDestroy, TemplateRef, effect, inject, input as inputParam, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize } from 'rxjs';

import { ButtonComponent } from '../../../../ui/button';
import { PostersService } from '../../services';
import { Poster } from '../../types';

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnDestroy {
  private service = inject(PostersService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  protected loading = signal<boolean>(true);
  protected item = signal<Poster | null>(null);
  public id = inputParam.required<string>();

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.getItem(id);
      }
    });
  }

  public ngOnDestroy(): void {
    this.toast.close('confirm-delete');
  }

  private getItem(id: string): void {
    this.loading.set(true);
    this.service
      .details(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.item.set(response);
        },
        error: () => {
          this.toast.error('Não conseguimos carregar o poster. Tente novamente mais tarde.');
        },
      });
  }

  protected deleteItem(): void {
    this.service.delete(this.id()).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toast.success('Poster excluído com sucesso!');
      },
      error: () => {
        this.toast.error('Não conseguimos excluir o poster. Tente novamente mais tarde.');
      },
    });
  }

  protected confirmDelete(template: TemplateRef<HTMLDivElement>): void {
    this.toast.show(template, {
      autoClose: false,
      dismissible: true,
      position: 'top-center',
      id: 'confirm-delete',
    });
  }
}
