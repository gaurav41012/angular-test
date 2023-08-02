import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UpdateTicketStatusComponent } from './update-ticket-status.component';
import { AppComponent } from 'src/app/app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

describe('UpdateTicketStatusComponent', () => {
  let component: UpdateTicketStatusComponent;
  let fixture: ComponentFixture<UpdateTicketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,MatToolbarModule,MatIconModule,MatMenuModule],

      declarations: [UpdateTicketStatusComponent,AppComponent,NavbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
