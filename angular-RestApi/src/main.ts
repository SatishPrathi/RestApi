import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhBYVppR2Nbe05xflFCal9XVBYiSV9jS3pTfkVhWHxadHdTR2hbVQ==');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));