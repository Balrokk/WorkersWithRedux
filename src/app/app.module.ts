import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {StoreModule} from '@ngrx/store';
import { historyReducer } from './reducers/historyReducer';
import { formReducer} from './reducers/form.reducer';
import {accountsReducer} from './reducers/accounts.reducer';

import {ListComponent} from './Components/list/list.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {ViewProfileComponent} from './Components/view-profile/view-profile.component'
import  {ViewRecordComponent} from  './Components/view-record/view-record.component'
import { HistoryListComponent } from './Components/history-list/history-list.component'

import { RegistrationComponent } from './Components/registration/registration.component';
import { MenuComponent } from './Components/menu/menu.component';
import {AuthorizationComponent} from './Components/authorization/authorization.component';
import {MenuGuard} from './menu.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MyDataPipe } from './mydata.pipe';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', redirectTo: 'authorization', pathMatch:'full'},
    { path: 'authorization', component: AuthorizationComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'menu', component: MenuComponent, canActivate: [MenuGuard]},
    { path: 'menu/list', component: ListComponent},
    { path: 'menu/history-list', component: HistoryListComponent},
    { path: 'menu/list/profile', component: ProfileComponent},
    { path: 'menu/list/view-profile/:id', component: ViewProfileComponent},
    { path: 'menu/history-list/view-record/:id', component: ViewRecordComponent},
    { path: '**', component: NotFoundComponent}
    ];


@NgModule({
    declarations: [
        AuthorizationComponent,
        AppComponent,
        ListComponent,
        ProfileComponent,
        ViewProfileComponent,
        ViewRecordComponent,
        HistoryListComponent,
        RegistrationComponent,
        MenuComponent,
        NotFoundComponent,
        MyDataPipe
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            form: formReducer,
            history: historyReducer,
            accounts: accountsReducer
        })
    ],
    providers: [MenuGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
