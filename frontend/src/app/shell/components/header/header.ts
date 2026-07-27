import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { User } from '../../../core/models/user.model';
import { Input } from '../../../shared/ui/input/input';

@Component({
  selector: 'app-header',
  imports: [Input],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  readonly user: User;

  constructor(
    private readonly headerService: HeaderService,
  ) {

    this.user = this.headerService.getCurrentUser();

  }

}