import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamService } from '../../shared/services/team/team.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control-team',
  templateUrl: './control-team.component.html',
  styleUrls: ['./control-team.component.css']
})
export class ControlTeamComponent implements OnInit {
  teams: any[] = [];
  messageError: string | null = null;
  isLoading = false;
  currentTeamId: string | null = null;

  TeamForm: FormGroup = new FormGroup({
    teamImg: new FormControl(null),
    teamMemberName: new FormControl(''),
    teamMemberRole: new FormControl(''),
  });

  constructor(private _TeamService: TeamService) {}

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    this._TeamService.getTeam().subscribe({
      next: (response) => {
        this.teams = response;
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching team members';
      }
    });
  }

  handleAddOrUpdateTeam(): void {
    if (this.TeamForm.valid) {
      this.isLoading = true;
      const formData = new FormData();

      const imageFile = this.TeamForm.get('teamImg')?.value;
      if (imageFile) {
        formData.append('teamImg', imageFile);
      }

      formData.append('teamMemberName', this.TeamForm.get('teamMemberName')?.value);
      formData.append('teamMemberRole', this.TeamForm.get('teamMemberRole')?.value);

      if (this.currentTeamId) {
        this._TeamService.updateTeam(formData, this.currentTeamId).subscribe({
          next: () => {
            this.isLoading = false;
            this.getTeam();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error updating team member';
          }
        });
      } else {
        this._TeamService.addTeam(formData).subscribe({
          next: () => {
            this.isLoading = false;
            this.getTeam();
            this.resetForm();
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.messageError = 'Error adding team member';
          }
        });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.TeamForm.patchValue({
        teamImg: file
      });
    }
  }

  editTeam(team: any): void {
    this.currentTeamId = team._id;
    this.TeamForm.patchValue({
      teamImg: null,
      teamMemberName: team.teamMemberName,
      teamMemberRole: team.teamMemberRole,
    });
  }


  resetForm(): void {
    this.currentTeamId = null;
    this.TeamForm.reset();
  }

  deleteTeam(id: string): void {
    this._TeamService.deleteTeam(id).subscribe({
      next: () => {
        this.getTeam();
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error deleting team member';
      }
    });
  }
}
