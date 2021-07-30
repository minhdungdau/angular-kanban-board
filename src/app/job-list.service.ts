import { JOBLIST } from './job-list.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobListService {

  constructor() { }

  jobLists: JOBLIST[] = [
    {
      name: "To do",
      jobs: ["Get to work", "Pick up groceries", "Go home", "Fall asleep"],
    },
    {
      name: "Doing",
      jobs: [
        "Get up",
        "Brush teeth",
        "Take a shower",
        "Check e-mail",
        "Walk dog",
      ],
    },
  ];

  updateLocalStorage(): void {
    if (window && window.localStorage) {
      window.localStorage.setItem("jobLists", JSON.stringify(this.jobLists));
    }
  }

  getJobLists(): JOBLIST[] {
    if (window && window.localStorage) {
      this.jobLists = JSON.parse(window.localStorage.getItem('jobLists') || "")
    }
    
    return this.jobLists;
  }

  addNewList(listName:string) {
    this.jobLists.push({
      name:listName,
      jobs: []
    })

    this.updateLocalStorage();

    return true;
  }

  addNewJob (listIndex: number, job: string) {
    this.jobLists[listIndex].jobs.push(job)

    this.updateLocalStorage();

    return true;
  }

  deleteJob(listIndex: number, jobIndex: number) {
    if (this.jobLists[listIndex]) {
      this.jobLists[listIndex].jobs.splice(jobIndex,1)
  
      this.updateLocalStorage();
  
      
      return true;
    }
    return false
  }

  deleteList(listIndex: number) {
    if (this.jobLists[listIndex]) {
      this.jobLists.splice(listIndex, 1)
  
      this.updateLocalStorage();
  
      return true;
    }
    return false
  }
}
