import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//it handles any error that might occur during the bootstrap process.If there is an error during the application's initialization,it will be caught here and logged in the console using 'console.error()'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
