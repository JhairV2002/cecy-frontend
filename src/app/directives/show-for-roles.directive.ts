import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '@services/auth';
import { distinctUntilChanged, map, Subscription, tap } from 'rxjs';

@Directive({
  selector: '[appShowForRoles]',
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('showForRoles') allowedRoles?: any = [];
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.user$
      .pipe(
        map((user) =>
          Boolean(user && this.allowedRoles.includes(user[0].role))
        ),
        distinctUntilChanged(),
        tap((hasRole) =>
          hasRole
            ? this.viewContainerRef.createEmbeddedView(this.templateRef)
            : this.viewContainerRef.clear
        )
      )
      .subscribe();
  }
}
