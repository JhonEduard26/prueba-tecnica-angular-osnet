import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'dashboard-confirm-alert',
  imports: [],
  templateUrl: './confirm-alert.component.html',
  styles: ``,
})
export class ConfirmAlertComponent {
  @Input() productId!: number;
  @Output() confirmAction = new EventEmitter<number>();
  @ViewChild('confirmAlert') confirmAlert!: ElementRef<HTMLDialogElement>;

  confirm() {
    this.confirmAction.emit(this.productId);
    this.closeDialog();
  }

  openDialog() {
    this.confirmAlert.nativeElement.showModal();
  }

  closeDialog() {
    this.confirmAlert.nativeElement.close();
  }
}
