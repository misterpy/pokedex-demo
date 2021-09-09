import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pokedex-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent {
  idControl = new FormControl('', Validators.required);

  constructor(
    dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private readonly authService: AuthService,
  ) {
  }

  onContinue(): void {
    if (this.idControl.invalid) {
      return;
    }

    this.authService.login(this.idControl.value);
  }
}
