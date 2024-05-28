import { Component, OnInit } from '@angular/core';
import { Menu } from './interfaces/menu';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }


  isOpened: boolean = true;


  ngOnInit(): void {

  }
  Menu: Menu[] = [
    {
      text: 'Home',
      link: '/admin/home',
      icon: 'fa-solid fa-house',

    },
    {
      text: 'Users',
      link: '/admin/users',
      icon: 'fa-solid fa-users'

    },
    {
      text: 'Booking',
      link: '/admin/booking',
      icon: 'fa-solid fa-ticket'

    },
    {
      text: 'Rooms',
      link: '/admin/rooms',
      icon: 'fa-solid fa-person-shelter'

    },
    {
      text: 'Ads',
      link: '/admin/ads',
      icon: 'fa-solid fa-wand-magic-sparkles'

    },
    {
      text: 'Facilities',
      link: '/admin/facilities',
      icon: 'fa-regular fa-window-restore',
     

    }
    
  ]

}
