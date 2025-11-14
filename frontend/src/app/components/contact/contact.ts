import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  // Import MatSnackBar
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],  // Add MatSnackBarModule here
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  };

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    this.sendEmail();
  }

  // Send the email using EmailJS
  sendEmail() {
    const templateParams = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      phone: this.formData.phone,
      message: this.formData.message,
    };

    emailjs
      .send(
        environment.emailJS.serviceID,
        environment.emailJS.templateID,
        templateParams,
        environment.emailJS.userID
      )
      .then(
        () => {
          this.showSnackbar('Message sent successfully!', 'success');
          this.resetForm();
        },
        (error) => {
          console.error('Failed to send message', error);
          this.showSnackbar('Failed to send message. Please try again.', 'error');
        }
      );
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
    };
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    const snackBarClass = type === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [snackBarClass],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
