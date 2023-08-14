import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  editMode = false;
  userId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.userId = +params['id'];
        const user = this.userService.getUserById(this.userId); 
        if (user) {
          this.userForm?.patchValue(user);
        }
      }
    });
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.userForm?.valid) {
      const userData: any = this.userForm.value;
      if (this.editMode) {
        this.userService.updateUser(userData);
      } else {
        this.userService.addUser(userData);
      }
      this.userForm.reset(); 
    }
  }
}
