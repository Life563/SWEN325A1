import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AddNotePage } from '../pages/add-note/add-note';
import { ViewNotesPage } from '../pages/view-notes/view-notes';
import { AddReminderPage } from '../pages/add-reminder/add-reminder';
import { ViewRemindersPage } from '../pages/view-reminders/view-reminders';
import { AddToDoPage } from '../pages/add-to-do/add-to-do';
import { ViewToDoPage } from '../pages/view-to-do/view-to-do';

import { Data } from '../providers/data/data';
import { SettingsProvider } from '../providers/settings/settings';

import { firebaseConfig } from '../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AddNotePage,
    ViewNotesPage,
    AddReminderPage,
    ViewRemindersPage,
    AddToDoPage,
    ViewToDoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AddNotePage,
    ViewNotesPage,
    AddReminderPage,
    ViewRemindersPage,
    AddToDoPage,
    ViewToDoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    Data,
    SettingsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
