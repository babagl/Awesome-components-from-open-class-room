import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../model/post.model";
import {PostsService} from "../services/posts.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class PostsResolvers implements Resolve<Post[]>{

  constructor(private postService: PostsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Post[]> {
    return this.postService.getPosts()
  }
}
