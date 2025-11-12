import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imageslider',
  imports: [CommonModule],
  templateUrl: './imageslider.html',
  styleUrls: ['./imageslider.css'],
})
export class Imageslider implements OnInit, OnDestroy {
  // Array of image URLs for the slider
  imageUrls: string[] = [
    'assets/images/hero-img.jpg',
    'assets/images/hero-img.jpg',
    'assets/images/hero-img.jpg',
  ];

  // Captions corresponding to the images
  captions = [
    {
      header: 'Home Health Services in Hillsboro, OR',
      description:
        'We provide personalized care for patients in the comfort of their own home.',
    },
    {
      header: 'Hospice Care You Can Trust',
      description:
        'Our compassionate hospice services are dedicated to improving the quality of life.',
    },
    {
      header: 'Meet Our Professional Team',
      description:
        'Our team includes highly trained Registered Nurses, Licensed Practical Nurses, and Certified Nursing Assistants.',
    },
  ];

  // Current slide index
  currentIndex: number = 0;
  nextIndex: number = 1; // Store the index for the next image

  private slideInterval: any; // To store the interval reference
  private scrollListener: any; // Store scroll event listener reference

  ngOnInit() {
    this.startAutoSlide(); // Start the auto slide when the component initializes
    this.addScrollListener(); // Add scroll listener to track scroll position
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // Clear the interval when the component is destroyed
    }
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener); // Clean up scroll listener
    }
  }

  // Function to go to the next slide
  nextSlide() {
    this.currentIndex = this.nextIndex;
    this.nextIndex = (this.currentIndex + 1) % this.imageUrls.length;
  }

  // Function to go to the previous slide
  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
    this.nextIndex = (this.currentIndex + 1) % this.imageUrls.length;
  }

  // Start auto sliding every 5 seconds
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide(); // Automatically move to the next slide
    }, 5000); // Change slide every 5 seconds (5000ms)
  }

  // Method to get a dynamic aria-label based on the current caption
  getAriaLabel(): string {
    const currentCaption = this.captions[this.currentIndex];
    return `Image slider showing: ${currentCaption.header} - ${currentCaption.description}`;
  }

  // Add scroll listener to update the position of the caption as user scrolls
  addScrollListener() {
    this.scrollListener = () => {
      const scrollPosition = window.scrollY; // Get current scroll position
      const scrollFactor = scrollPosition / 5; // Adjust the scroll speed factor here (divide for slower effect)
      const captionElement = document.querySelector('.header-content') as HTMLElement;
      if (captionElement) {
        // Apply a translation effect to move the caption up/down as the page scrolls
        captionElement.style.transform = `translate(-50%, calc(-50% + ${scrollFactor}px))`;
      }
    };
    window.addEventListener('scroll', this.scrollListener);
  }
}
