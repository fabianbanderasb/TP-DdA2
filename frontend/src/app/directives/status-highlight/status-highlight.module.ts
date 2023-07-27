import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusHighlightDirective } from './status-highlight.directive';

@NgModule({
  declarations: [StatusHighlightDirective],
  imports: [CommonModule],
  exports: [StatusHighlightDirective],
})
export class StatusHighlightModule {}
