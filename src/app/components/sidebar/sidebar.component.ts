import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Login,
  TwitchAuthService
} from '../../providers/twitch-auth-graphql.service';

// Sidebar component
@Component({
  templateUrl: './sidebar.component.html',
  selector: 'tw-sidebar',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  login: Login;
  items = [
    {
      name: 'Games',
      route: '/games',
      icon: 'games',
      visible: true,
      active: true
    },
    {
      name: 'Channels',
      route: '/channels/top',
      icon: 'videocam',
      visible: true,
      active: false
    },
    {
      name: 'Following',
      route: '/channels/following',
      icon: 'star',
      visible: false,
      active: false
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: 'settings',
      visible: true,
      active: false
    }
  ];

  activeItem = this.items[0];

  constructor(
    public router: Router,
    private twitchAuthService: TwitchAuthService
  ) {}

  ngOnInit(): void {
    this.twitchAuthService.loginChange$.subscribe((login: Login) => {
      this.login = login;
      this.items[2].visible = this.login.logued;
    });
  }

  navigate(item): void {
    this.activeItem.active = false;
    item.active = true;
    this.activeItem = item;
    this.router.navigate([item.route]);
  }
}
