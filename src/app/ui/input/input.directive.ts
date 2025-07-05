import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { ClassValue } from 'clsx';

import { mergeClasses } from '../utils';

export const inputVariants = cva('', {
  variants: {
    appType: {
      default:
        'flex rounded-md border-2 px-4 font-normal border-input bg-transparent text-base md:text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      textarea:
        'flex min-h-[80px] rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    },
    appSize: {
      default: 'h-10 py-2 file:max-md:py-0',
    },
    appStatus: {
      error: 'border-red focus-visible:ring-red',
      warning: 'border-yellow-500 focus-visible:ring-yellow-500',
      success: 'border-green-500 focus-visible:ring-green-500',
    },
  },
  defaultVariants: {
    appType: 'default',
    appSize: 'default',
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: 'input[app-input], textarea[app-input]',
  exportAs: 'appInput',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class InputDirective {
  private readonly isTextarea = inject(ElementRef).nativeElement.tagName.toLowerCase() === 'textarea';

  readonly appStatus = input<InputVariants['appStatus']>();

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      inputVariants({
        appType: !this.isTextarea ? 'default' : 'textarea',
        appStatus: this.appStatus(),
      }),
      this.class()
    )
  );
}
