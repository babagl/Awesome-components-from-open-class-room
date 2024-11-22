
import {  Routes } from '@angular/router';
import {PostListComponent} from "./components/post-list/post-list.component";
import {PostsResolvers} from "./resolvers/posts.resolver";

export  const routesGeneral: Routes = [
  {path:'', component: PostListComponent, resolve: {posts: PostsResolvers}}
];

