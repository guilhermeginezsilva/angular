import { ViewsModule } from './views/views.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from './template/template.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ViewsModule,
    TemplateModule,
  ],
  exports: [
    ViewsModule,
    TemplateModule,
  ]
})
export class CoreModule { }
