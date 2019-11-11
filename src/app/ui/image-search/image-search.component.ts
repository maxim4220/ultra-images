import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.sass']
})

export class ImageSearchComponent {
  @Output() emitSearch = new EventEmitter<string>();
  public searchForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, ) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  public performSearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.emitSearch.emit( this.f.search.value);
  }

}
