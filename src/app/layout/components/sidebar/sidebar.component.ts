import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Access } from '../user-access/access.model';
import { UserAccessService } from '../user-access/user-access.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router,private userAccessSeravice : UserAccessService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        
        this.getUsersAccess();
        console.log('awaa awaa');
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    error: string;
    //userAccess: Access;
array = [{
    guid: '900ea552-ef68-42cc-b6a6-b8c4dff10fb7',
    age: 32,
    name: 'Powers Schneider',
  },
  {
    guid: '880381d3-8dca-4aed-b207-b3b4e575a15f',
    age: 25,
    name: 'Adrian Lawrence',
  },
  {
    guid: '87b47684-c465-4c51-8c88-3f1a1aa2671b',
    age: 32,
    name: 'Boyer Stanley',
  },
]

    
    userAccess:any;
    getUsersAccess(){
      this.userAccessSeravice.getUsersAccess().subscribe(
        user=>{
          
          //this.userAccess = user;
          this.userAccess = Object.keys(user).map(key => user[key]);
          console.log(this.userAccess);
          console.log(this.array);
        },
        error => {
          this.error = error;
        }
      );
    }
}
