import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSongPageRoutingModule } from './add-song-routing.module';

import { AddSongPage } from './add-song.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddSongPageRoutingModule,
  ],
  declarations: [AddSongPage],
})
export class AddSongPageModule {}
