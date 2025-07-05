import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { ClassValue } from 'clsx';

import { mergeClasses, transform } from '../utils';

export const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      appType: {
        default: 'bg-black text-white hover:bg-black/60',
        destructive: 'bg-red-500 text-white dark:text-white hover:bg-red-600',
        outline: 'border-2 hover:bg-black/10',
        ghost: 'bg-transparent text-black hover:bg-black/10',
      },
      appSize: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 ',
        lg: 'h-11 px-8 ',
        icon: 'h-10 w-10',
      },
      appShape: {
        default: 'rounded-md',
        circle: 'rounded-full',
        square: 'rounded-none',
      },
      appFull: {
        true: 'w-full',
      },
      appLoading: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      appType: 'default',
      appSize: 'default',
      appShape: 'default',
    },
  }
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Component({
  selector: 'app-button, button[app-button], a[app-button]',
  exportAs: 'appButton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (appLoading()) {
      <span class="icon-loader-circle animate-spin"></span>
    }

    <ng-content></ng-content>
  `,
  host: {
    '[class]': 'classes()',
  },
})
export class ButtonComponent {
  private readonly elementRef = inject(ElementRef);

  readonly appType = input<ButtonVariants['appType']>('default');
  readonly appSize = input<ButtonVariants['appSize']>('default');
  readonly appShape = input<ButtonVariants['appShape']>('default');

  readonly class = input<ClassValue>('');

  readonly appFull = input(false, { transform });
  readonly appLoading = input(false, { transform });

  protected readonly classes = computed(() =>
    mergeClasses(
      buttonVariants({
        appType: this.appType(),
        appSize: this.iconOnly() ? 'icon' : this.appSize(),
        appShape: this.appShape(),
        appFull: this.appFull(),
        appLoading: this.appLoading(),
      }),
      this.class()
    )
  );

  private iconOnly(): boolean {
    const childNodes = Array.from((this.elementRef?.nativeElement as HTMLButtonElement)?.childNodes || []);
    return childNodes.every(node => !['#text', 'SPAN'].includes(node.nodeName));
  }
}
