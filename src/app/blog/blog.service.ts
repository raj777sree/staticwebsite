import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog} from './blog.modal';
import { Subject, Subscription } from 'rxjs';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/blog/";

@Injectable({ providedIn: "root" })
export class BlogService implements OnDestroy{
  returnedBlogs: Blog[];
  updated: boolean;
  blog: Blog;
  private getSubject = new Subject<{ blogs: Blog[] }>();
  private getServiceSubscription: Subscription;
  private addServiceSubscription: Subscription;

  constructor(private http: HttpClient) {}

  add(data) {
    this.addServiceSubscription = this.http
      .post<{ updated: boolean }>(BACKEND_URL + "addBlog", data)
      .subscribe((returnedData) => {
        this.updated = returnedData.updated;
      });
  }

  getAllBlogs() {
    this.getServiceSubscription = this.http
      .get<{ blogs: Blog[] }>(BACKEND_URL + "getAllBlogs")
      .subscribe((returnedData) => {
        this.returnedBlogs = returnedData.blogs;
        this.getSubject.next({
          blogs: this.returnedBlogs,
        });
      });
  }

  getBlogListener() {
    return this.getSubject.asObservable();
  }

  deleteBlog(id) {
    this.getServiceSubscription = this.http
      .delete<{ blogs: Blog[] }>(BACKEND_URL + "deleteBlog/" + id)
      .subscribe((returnedData) => {
        this.returnedBlogs = returnedData["blogs"];
        this.getSubject.next({
          blogs: this.returnedBlogs,
        });
      });
  }

  getBlogById(id) {
    return this.http
      .get<{ blog: Blog }>(BACKEND_URL + "getBlogById/" + id)
      .toPromise();
  }

  updateBlog(id, data) {
    this.getServiceSubscription = this.http
      .put<{ blog: Blog }>(BACKEND_URL + "updateBlog/" + id, data)
      .subscribe((returnedData) => {
        this.returnedBlogs = returnedData["blogs"];
        this.getSubject.next({
          blogs: this.returnedBlogs,
        });
      });
  }

  ngOnDestroy() {
    if (this.getServiceSubscription) {
      this.getServiceSubscription.unsubscribe();
    }

    if (this.addServiceSubscription) {
      this.addServiceSubscription.unsubscribe();
    }
  }
}
