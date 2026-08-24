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

  readonly clearable = input(false);

  /**
   * Emitted when the user presses Enter
   * while the input has focus.
   */
  readonly enter = output<void>();

  /**
   * Emitted when the input value is cleared
   * through the clear button.
   */
  readonly clear = output<void>();

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

  get showClearButton(): boolean {
    return this.clearable() &&
      this.value.length > 0 &&
      !this.disabled;
  }

  handleInput(event: Event): void {
    const input =
      event.target as HTMLInputElement;

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

  handleClear(): void {
    this.value = '';

    this.onChange(this.value);
    this.onTouched();

    this.clear.emit();
  }
}