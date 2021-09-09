import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './authentication/shared/auth.service';
import { RegistrationDialogComponent } from './authentication/registration-dialog/registration-dialog.component';

@Component({
  selector: 'pokedex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
  ) {
    this.processUserAuthenticationStatus();
  }

  processUserAuthenticationStatus(): void {
    if (this.authService.isLoggedIn()) {
      return;
    }

    this.dialog.open(RegistrationDialogComponent, { disableClose: true });
  }
}
