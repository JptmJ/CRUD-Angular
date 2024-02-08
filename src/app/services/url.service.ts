import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url = "13.235.68.226";

  getGoal = `http://${this.url}:3010/getGoals`;
  postGoal = `http://${this.url}:3010/addGoal`;
  updateGoal = `http://${this.url}:3010/updateGoal`;
  deleteGoal = `http://${this.url}:3010/deleteGoal`;

  constructor() { }
}
