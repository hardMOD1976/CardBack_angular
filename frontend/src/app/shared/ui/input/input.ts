import {
  Component,
  forwardRef,
  input,
  output,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'cb-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  readonly type = input('text');

  readonly placeholder = input('');

  /**
   * Emitted when the user presses Enter
   * while the input has focus.
   */
  readonly enter = output<void>();

  private value = '';

  private disabled = false;

  private onChange: (value: string) => void = () => {};

  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(
    fn: (value: string) => void,
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(
    fn: () => void,
  ): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get currentValue(): string {
    return this.value;
  }

  get isDisabled(): boolean {
    return this.disabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    this.enter.emit();
  }
}