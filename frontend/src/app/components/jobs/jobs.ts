import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class Jobs {
  jobRoles = ['LPN', 'CNA', 'RN']; // available roles
  formData: any = { name: '', phone: '', email: '', role: '', resume: '' };
  resumeFile: File | null = null;

  constructor(private http: HttpClient) {}

  // Handle role selection and form data binding
  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  // Function to submit the form data and resume to the backend
  submitApplication() {
    if (!this.formData.name || !this.formData.phone || !this.formData.email || !this.formData.role || !this.resumeFile) {
      alert('Please fill in all the required fields and upload a resume.');
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
      (response) => {
        console.log('Application submitted successfully:', response);
        alert('Your application has been submitted successfully!');
      },
      (error) => {
        console.error('Error submitting application:', error);
        alert('There was an issue submitting your application. Please try again.');
      }
    );
  }
}
