import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ErrorService, ErrorValue } from '../../providers/errorhandler.service';

// Error display component
@Component({
  templateUrl: './errorhandler.component.html',
  selector: 'tw-error',
  styleUrls: ['./errorhandler.component.scss']
})
export class ErrorComponent {
  displayError = false;
  error: string;
  reason = null;

  constructor(private router: Router, private errorService: ErrorService) {
    // Subscribe to the onError event of the service to show or hide
    // the component bassed on its value
    this.errorService.onError$.subscribe((errorValue: ErrorValue) => {
      if (errorValue.error) {
        this.error = errorValue.error;
        this.reason = errorValue.reason;
        this.displayError = true;
      } else {
        // `null` is used as the hide value
        this.displayError = false;
        this.error = '';
        this.reason = null;
      }
    });

    // Hide error message on any route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.displayError = false;
        this.error = '';
        this.reason = null;
      }
    });
  }

  retry(): void {
    this.displayError = false;
    this.error = '';

    // TODO
    // Maybe reloading the current component?
  }
}
