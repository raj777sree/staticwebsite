import { Blog } from './blog.modal';
import { BlogService } from './blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, OnDestroy {
  private blogForm: FormGroup;
  returnedBlogs: Blog[];
  returnedBlog: Blog;
  private getServiceSubscription: Subscription;
  add = false;
  update_id: string;

  constructor(
    private fb: FormBuilder,
    private service: BlogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getAllBlogs();
  }

  createForm() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      blogContent: ['', Validators.required],
    });
  }

  onSubmit() {
    this.service.add(this.blogForm.value);
    this.snackBar.open('Blog Added Successfully', '', {
      duration: 2000,
    });
    this.getAllBlogs();
    this.blogForm.reset();
  }

  getAllBlogs() {
    this.service.getAllBlogs();
    this.getServiceSubscription = this.service
      .getBlogListener()
      .subscribe((returnedData) => {
        this.returnedBlogs = returnedData.blogs;
      });
  }

  deleteBlog(id) {
    this.service.deleteBlog(id);
    this.blogForm.reset();
    this.snackBar.open('Blog Deleted Successfully', '', {
      duration: 2000,
    });
    this.add = false;
  }

  async editBlog(id) {
    this.update_id = id;
    let returnedData = await this.service.getBlogById(id);
    this.returnedBlog = returnedData.blog;
    this.blogForm.setValue({
      title: this.returnedBlog[0].title,
      blogContent: this.returnedBlog[0].content,
    });
    this.add = true;
  }

  onUpdate() {
    this.service.updateBlog(this.update_id, this.blogForm.value);
    this.blogForm.reset();
    this.add = false;
    this.snackBar.open('Blog Updated Successfully', '', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    if (this.getServiceSubscription) {
      this.getServiceSubscription.unsubscribe();
    }
  }
}
