import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../services/url.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css'
})
export class UpdatePageComponent implements OnInit {

  goalId: number = 0;
  goalName: string = '';
  goalStatus: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private urlService: UrlService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.goalId = state['goalId'];
      this.updateForm.patchValue({
        goalName: state['goalName'],
        goalStatus: state['goalStatus']
      });
    }
  }

  noWhitespaceValidator(control: { value: string }): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  updateForm: FormGroup = this.fb.group({
    goalName: [this.goalName, [Validators.required, this.noWhitespaceValidator]],
    goalStatus: [this.goalStatus, Validators.required]
  });

  ngOnInit(): void { }

  handleUpdateSubmit() {
    if (this.updateForm.valid) {
      const formData = { ...this.updateForm.value, id: `${this.goalId}` };

      this.http.post(this.urlService.updateGoal, formData)
        .subscribe(
          (response) => {
            this.router.navigate(['/']);
            console.log(formData);
            console.log('Success!', response);
          },
          (error) => {
            console.error('Error!', error);
            console.log(formData);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }

  cancelUpdate() {
    this.router.navigate(['/']);
  }
}
