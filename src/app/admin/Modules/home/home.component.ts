import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home-service/home.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userCount: number = 0;
  adminCount: number = 0;
  pendingBookings: number = 0;
  completedBookings: number = 0;
  rooms: number = 0
  facilities: number = 0
  ads: number = 0
  userAdminChart: any;
  bookingStatusChart: any;
  RoomsAndFacilities: any;
  chart: any = [];
  newChart: any = [];
  userAndAdminChart: any = []

  constructor(private _HomeService: HomeService) { }


  ngOnInit(): void {
    this.fetchData();
    this.bookingChart();
    this.usersChart();


  }
  fetchData() {
    this._HomeService.getCharts().subscribe({
      next: (response) => {
        this.rooms = response.data.rooms;
        this.facilities = response.data.facilities;
        this.pendingBookings = response.data.bookings.pending;
        this.completedBookings = response.data.bookings.completed;
        this.ads = response.data.ads;
        this.userCount = response.data.users.user;
        this.adminCount = response.data.users.admin;
      }, error: (err) => {
        console.error('Error fetching dashboard data:', err);

      }
    });
  }

  bookingChart() {
    this._HomeService.getCharts().subscribe({
      next: (response) => {
        this.pendingBookings = response.data.bookings.pending;
        this.completedBookings = response.data.bookings.completed;
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
      complete: () => {
        this.chart = new Chart('bookingChart', {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'Completed'],
            datasets: [{
              label: 'Count',
              data: [this.pendingBookings, this.completedBookings],
              backgroundColor: ['#007bff', '#28a745']
            }]
          }
        });
      }
    });
  }
  usersChart() {
    this._HomeService.getCharts().subscribe({
      next: (response) => {
        this.userCount = response.data.users.user;
        this.adminCount = response.data.users.admin;
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
      complete: () => {
        this.newChart = new Chart('usersChart', {
          type: 'bar',
          data: {
            labels: ['Users', 'Admins'],
            datasets: [{
              label: 'Count',
              data: [this.userCount, this.adminCount],
              backgroundColor: ['#007bff', '#28a745']
            }]
          }
        });
      }
    });
  }



}

