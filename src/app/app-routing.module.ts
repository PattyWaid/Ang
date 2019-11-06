import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DisplayBlogs } from './shared/display-blogs/display-blogs.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModules'},
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  { path: 'blogs' , component: DisplayBlogs, data:{allBlogs: 'All Blogs'}, 
   children: [
    { path: 'technology', component: DisplayBlogs, data: {technology: 'Technology'} },
    { path: 'automobiles', component: DisplayBlogs, data: {automobiles: 'Automobiles'} },
    { path: 'animations', component: DisplayBlogs, data: {animations: 'Animations'} }
   ]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
