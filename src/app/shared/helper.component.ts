import { Component, Input } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-helper',
  standalone: true,
  imports: [ToastModule,ConfirmDialogModule],
  template: `
  <p-toast position="bottom-right"></p-toast>
<p-confirmdialog />`,
  providers: []
})
export class HelperComponent {
}