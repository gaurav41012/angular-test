import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesComponent } from './movies.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';

// Create a mock service to handle the allMovies API call
class MockUserService {
  allMovies() {
    // Return an observable with a mock response
    return of([
      { movieName: 'Movie A', theatreName: 'Theatre X', ticketsStatus: 'AVAILABLE' },
      { movieName: 'Movie B', theatreName: 'Theatre Y', ticketsStatus: 'SOLD OUT' }
    ]);
  }
}

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    userService = new MockUserService();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, MatDividerModule, MatToolbarModule, MatIconModule, MatMenuModule],
      declarations: [MoviesComponent, NavbarComponent],
      providers: [
        // Provide the mock services directly
        { provide: UserService, useValue: userService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Swal with info message when a movie with "SOLD OUT" status is clicked to buy tickets', () => {
    spyOn(Swal, 'fire');

    component.movies = [
      { position: 1, movieName: 'Movie A', theaterName: 'Theatre X', ticketStatus: 'SOLD OUT' },
      { position: 2, movieName: 'Movie B', theaterName: 'Theatre Y', ticketStatus: 'AVAILABLE' }
    ];

    component.onClickBuyTicket('Movie A');

    expect(Swal.fire).toHaveBeenCalledWith('Cannot Book', 'This Movie is Sold Out', 'info');
  });
});
