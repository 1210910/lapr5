import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import routes from "./routes";
import { AuthModule } from "@auth0/auth0-angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      domain: 'dev-3hnosuh6oycbgons.us.auth0.com',
      clientId: "Sk0nEcUzFPLnFEdOx9QxkwEMNZ4yZP3N",
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/',
        clientSecret: "zKcE9W1WNxv4qFgHTiMwKyA57mNTb5CmVBe3rAd_vMA0jAwQwiS9Bw5VfhY2tKv9",
      }
    }),
  ],
  bootstrap: [AppComponent],
  providers: []
})

export class AppModule { }