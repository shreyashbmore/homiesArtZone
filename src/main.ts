import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify, Auth } from 'aws-amplify';

import { AppModule } from './app/app.module';
import { CognitoService } from './app/services/cognito.service';
import { environment } from './environments/environment';

Amplify.configure(environment.cognito);

const oauth = {
  domain : "artgallaryshop.auth.ap-northeast-1.amazoncognito.com",
  scope : ['email', 'openid', 'profile'],
  redirectSignIn : environment.baseLink,
  redirectSignOut : environment.baseLink,
  responseType : 'code',
  options : {
    AdvancedSecurityDataCollectionFlag: false
  }

}

Auth.configure({
  oauth : oauth
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
