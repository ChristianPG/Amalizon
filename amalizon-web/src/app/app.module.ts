import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartPreviewComponent } from './cart/cart-preview/cart-preview.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartDetailComponent } from './cart/cart-detail/cart-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartPreviewComponent,
    SearchBarComponent,
    ProductListComponent,
    HomeComponent,
    ProductDetailComponent,
    CartDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
