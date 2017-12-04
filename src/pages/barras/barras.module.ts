import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarrasPage } from './barras';

//Charts
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    BarrasPage,
  ],
  imports: [
    IonicPageModule.forChild(BarrasPage),
    ChartsModule
  ],
})
export class BarrasPageModule {}
