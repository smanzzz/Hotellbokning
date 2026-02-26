import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  
  inCheck = '';
  utCheck = '';
  roomType = '';
  quantity: number | null = null;

  
  isBooked = false;
  //referens till idag.
  today: string = new Date().toISOString().split('T')[0];
  maxDate: string = '2030-12-31';

  showBooking() {
    // Validering

     const amount = Number(this.quantity);

  if (!Number.isInteger(amount) || amount < 1 || amount > 10) {
    alert("Antal personer måste vara ett heltal mellan 1 och 10.");
    return;
  }

    if (!this.inCheck || !this.utCheck || !this.roomType || !amount) {
      alert("Fyll i alla fält först!");
      return;
    }
    
    if (this.inCheck < this.today) {
      alert("Incheckning kan inte vara i dåtid!");
      return;
    }

    
    if (this.utCheck <= this.inCheck) {
      alert("Utcheckning måste vara minst en dag efter incheckning.");
      return;
    }

    
    const bokning = {
      datum: `${this.inCheck} till ${this.utCheck}`,
      rum: this.roomType,
      personer: this.quantity
    };
    localStorage.setItem('hotellBokning', JSON.stringify(bokning));

    
    this.isBooked = true;
  }
}