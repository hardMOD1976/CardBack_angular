import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  getCurrentUser(): User {

    return {
      id: '',
      username: 'Collector',
      email: '',
    };

  }

}