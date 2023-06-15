import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongDetailsPageRoutingModule } from './song-details-routing.module';

import { SongDetailsPage } from './song-details.page';
import { HeaderModule } from '../../components/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongDetailsPageRoutingModule,
    HeaderModule,
  ],
  declarations: [SongDetailsPage],
})
export class SongDetailsPageModule {}
