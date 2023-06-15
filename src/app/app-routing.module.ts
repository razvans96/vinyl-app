import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        m => m.RegisterPageModule
      ),
  },
  {
    path: 'song/:id',
    loadChildren: () =>
      import('./pages/song-details/song-details.module').then(
        m => m.SongDetailsPageModule
      ),
  },
  {
    path: 'add-song',
    loadChildren: () =>
      import('./pages/add-song/add-song.module').then(m => m.AddSongPageModule),
  },
  {
    path: 'add-comment/:id',
    loadChildren: () =>
      import('./pages/add-comment/add-comment.module').then(
        m => m.AddCommentPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
