import { enableRipple } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';

enableRipple(true);
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhBYVppR2Nbe05xflFCal9XVBYiSV9jS3pTfkVhWHxadHdTR2hbVQ==');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
