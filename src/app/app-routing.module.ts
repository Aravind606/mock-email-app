import { SentboxComponent } from './sentbox/sentbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ViewmailComponent } from './viewmail/viewmail.component';
import { MailComponent } from './mail/mail.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "layout",
    component: LayoutComponent,
    children: [
      {
        path: "mail",
        component: MailComponent,
      },
      {
        path: "sent",
        component: SentboxComponent,
      },
      {
        path: "viewmail",
        component: ViewmailComponent,
      },
      {
        path: "compose",
        component: ComposeComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
