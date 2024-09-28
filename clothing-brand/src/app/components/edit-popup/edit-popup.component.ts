import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ValidatorFn,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      image: [''],
      price: ['', Validators.required],
      rating: [0],
    });
  }

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
    id: 0,
  };
  @Output() confirm = new EventEmitter<Product>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  onConfirm() {
    const {name, image, price, rating} = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
      id: this.product.id || 0,
    });


    this.display = !this.display;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = !this.display;

    this.displayChange.emit(this.display);
  }

  ngOnChanges(){
    this.productForm.patchValue(this.product);
  }
}
