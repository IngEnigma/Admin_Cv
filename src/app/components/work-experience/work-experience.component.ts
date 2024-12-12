import { WorkExperienceService } from '../../services/work-experience.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css',
})
export class WorkExperienceComponent {
  idWorkExperience: number | undefined;
  company: string = '';
  location: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  position: string = '';
  achievements: string = '';
  workExperiences: any[] = [];

  constructor(private workExperienceService: WorkExperienceService) {}

  ngOnInit() {
    this.queryWorkExperiences();
  }

  isFormValid(): boolean {
    if (
      (this.idWorkExperience || 
        this.company ||
        this.location ||
        this.description ||
        this.endDate ||
        this.startDate ||
        this.position) != ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(workForm: any) {
    const achievementsArray = this.achievements
      ? this.achievements.split(',').map((achievement) => achievement.trim())
      : [];

    this.workExperienceService
      .createWorkExperience(
        this.idWorkExperience!,
        this.company,
        this.location,
        this.description,
        this.endDate,
        this.startDate,
        this.position,
        achievementsArray
      )
      .subscribe({
        next: (response) => {
          console.log('Work experience created:', response);
          this.workExperiences = response;
          workForm.resetForm();
          this.queryWorkExperiences();
        },
        error: (error) => {
          console.error('Error creating work experience:', error);
        },
      });
  }

  queryWorkExperiences() {
    this.workExperienceService.getWorkExperiences().subscribe({
      next: (response) => {
        console.log('Work experiences:', response);
      },
      error: (error) => {
        console.error('Error fetching work experiences:', error);
      },
    });
  }

  deleteWorkExperience(idWorkExperience: number) {
    this.workExperienceService
      .deleteWorkExperience(idWorkExperience)
      .subscribe({
        next: (response) => {
          console.log('Work experience deleted:', response);
          this.queryWorkExperiences();
        },
        error: (error) => {
          console.error('Error deleting work experience:', error);
        },
      });
  }
}
