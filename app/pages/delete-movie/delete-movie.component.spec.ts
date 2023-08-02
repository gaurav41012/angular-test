import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DeleteMovieComponent } from './delete-movie.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

describe('DeleteMovieComponent', () => {
  let component: DeleteMovieComponent;
  let fixture: ComponentFixture<DeleteMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , RouterTestingModule,MatToolbarModule,MatIconModule,MatMenuModule],
      declarations: [ DeleteMovieComponent ,NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

