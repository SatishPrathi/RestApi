import { Component } from '@angular/core';

@Component({
  selector: 'app-invalid',
  template: `
    <div class="invalid-page">
      <h1>Invalid Page</h1>
      <p>The page you are trying to access is not valid.</p>
    </div>
  `,
  styles: [
    `
      .invalid-page {
        text-align: center;
        margin-top: 50px;
      }
      h1 {
        color: red;
      }
    `,
  ],
})
export class InvalidComponent {}
