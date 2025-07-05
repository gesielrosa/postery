import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, input as inputParam, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { finalize } from 'rxjs';

import { ButtonComponent } from '../../../../ui/button';
import { InputDirective } from '../../../../ui/input';
import { PostersService } from '../../services';
import { Poster } from '../../types';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, InputDirective, ButtonComponent, NgTemplateOutlet, ImageCropperComponent],
  templateUrl: './form.component.html',
})
export class FormComponent {
  private service = inject(PostersService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(HotToastService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  public id = inputParam<string>();
  protected loading = signal<boolean>(false);
  protected saving = signal<boolean>(false);
  protected item = signal<Poster | null>(null);
  protected referenceImage = signal<string | undefined>(undefined);

  protected posterForm = this.formBuilder.group({
    id: [''],
    title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    description: ['', Validators.required],
    imageData: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.getItem(id);
      }
    });
  }

  protected submitForm(): void {
    if (this.posterForm.invalid) {
      this.posterForm.markAllAsTouched();
      this.toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (this.posterForm.get('id')?.value) {
      this.updateItem();
    } else {
      this.createItem();
    }
  }

  protected onSelectImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.posterForm.controls['imageData'].setValue(reader.result as string);
          this.referenceImage.set(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error('Por favor, selecione um arquivo de imagem válido.');
      }
    }
  }

  protected imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.posterForm.controls['imageData'].setValue(event.base64);
    }
  }

  private getItem(id: string): void {
    this.loading.set(true);
    this.service
      .details(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => {
          this.item.set(response);
          this.posterForm.patchValue({
            id: response.id,
            title: response.title,
            description: response.description,
            imageData: response.imageData,
          });
          this.referenceImage.set(response.imageData);
        },
        error: () => {
          this.toast.error('Não conseguimos carregar o poster. Tente novamente mais tarde.');
        },
      });
  }

  private createItem(): void {
    this.saving.set(true);
    const params: Poster = {
      ...(this.posterForm.value as Poster),
      id: Date.now().toString(),
    };

    this.service
      .create(params)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toast.success('Poster criado com sucesso!');
        },
        error: () => {
          this.toast.error('Não conseguimos criar o poster. Tente novamente mais tarde.');
        },
      });
  }

  private updateItem(): void {
    this.saving.set(true);
    const params = this.posterForm.value as Poster;

    this.service
      .update(params)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/', 'posters', 'details', this.id()]);
          this.toast.success('Poster atualizado com sucesso!');
        },
        error: () => {
          this.toast.error('Não conseguimos atualizar o poster. Tente novamente mais tarde.');
        },
      });
  }
}
