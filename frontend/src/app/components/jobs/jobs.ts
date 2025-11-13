import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.html',  // Reference the HTML template
  styleUrls: ['./jobs.css'],   // Reference the CSS file
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatSnackBarModule, MatDialogModule, CommonModule], // Include MatDialogModule
})
export class Jobs {
  jobRoles = ['LPN', 'CNA', 'RN']; // available roles
  selectedRole: string | null = null;  // Track the selected role
  formData: any = { name: '', phone: '', email: '', role: '', resume: '' };
  resumeFile: File | null = null;
  isModalOpen: boolean = false; // Modal visibility flag

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // Function to select a job role and open the modal
  selectRole(role: string) {
    this.selectedRole = role;  // Set the selected role
    this.formData.role = role;  // Pre-fill the role in the form
    this.isModalOpen = true;  // Open the modal
  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Handle file input change event
  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  // Function to submit the form data and resume to the backend
  submitApplication() {
    if (
      !this.formData.name ||
      !this.formData.phone ||
      !this.formData.email ||
      !this.formData.role ||
      !this.resumeFile
    ) {
      this.snackBar.open('Please fill in all the required fields and upload a resume.', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', this.formData.name);
    formDataObj.append('email', this.formData.email);
    formDataObj.append('phone', this.formData.phone);
    formDataObj.append('role', this.formData.role);
    formDataObj.append('resume', this.resumeFile, this.resumeFile.name);

    // Call the backend API to send the email
    this.http.post('http://localhost:3000/send-email', formDataObj).subscribe(
      (response: any) => {
        this.snackBar.open('Your application has been submitted successfully!', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Reset form after successful submission
        this.resetForm();
        this.closeModal(); // Close the modal after submission
      },
      (error) => {
        this.snackBar.open('There was an issue submitting your application. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Function to reset the form
  resetForm() {
    this.formData = { name: '', phone: '', email: '', role: '', resume: '' };  // Reset form data
    this.resumeFile = null;  // Clear resume file

    // Optionally, reset file input element (if you want to visually clear the input)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';  // Clear the file input field
    }

    // Hide the form if the application is submitted or reset
    this.selectedRole = null;
  }
}
