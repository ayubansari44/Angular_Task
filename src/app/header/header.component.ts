
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStoreageService: DataStorageService, private authService: AuthService){}
  
  onSaveData(){
    this.dataStoreageService.storeRecipes();
  }

  ngOnInit(){
  this.userSub= this.authService.user.subscribe(user => {
    this.isAuthenticated=!!user;
  });
  }

  onFetchData(){
    this.dataStoreageService.fetchRecipes().subscribe() ;

  }

  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  
}
