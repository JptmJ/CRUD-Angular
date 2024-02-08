import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, provideHttpClient, withFetch } from '@angular/common/http';
import { UrlService } from '../../services/url.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePageComponent } from '../update-page/update-page.component';
import { NavigationExtras, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UpdatePageComponent, RouterLink, RouterLinkActive],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit {

  myForm: FormGroup;
  goal: any[] = [];

  constructor(private urlService: UrlService, private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    this.myForm = this.formBuilder.group({
      goalName: ['', [Validators.required, this.noWhitespaceValidator]],
      goalStatus: ['', Validators.required],
    });
  }

  noWhitespaceValidator(control: { value: string }): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  submitPost() {
    if (this.myForm.valid) {
      const formData = {
        goalName: this.myForm.get('goalName')!.value,
        goalStatus: this.myForm.get('goalStatus')!.value,
      };

      console.log('Form Data:', formData);

      this.http.post(this.urlService.postGoal, formData).subscribe(
        (response: any) => {
          console.log('Success!', response);
          this.getGoal();
          window.location.reload();
        },
        (error: any) => {
          console.error('Error!', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnInit(): void {
    this.getGoal();
  }

  getGoal() {
    const getData = this.urlService.getGoal;
    this.http.get<any[]>(getData).subscribe((data) => {
      this.goal = data;
    });
  }

  updateGoal(goalId: number, goalName: Text, goalStatus: Text) {
    console.log(`Updating goal with ID: ${goalId}`);

    const navigationExtras: NavigationExtras = {
      state: {
        goalId: goalId,
        goalName: goalName['textContent'],
        goalStatus: goalStatus['textContent']
      }
    };

    this.router.navigate(['update-page'], navigationExtras);
  }

  deleteGoal(goalId: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post(this.urlService.deleteGoal, { id: goalId }, httpOptions)
      .subscribe(
        (result: any) => {
          // Remove the deleted goal from the state
          this.goal = this.goal.filter(goal => goal.id !== goalId);
          console.log(result);
        },
        error => console.log('error', error)
      );
  }
}