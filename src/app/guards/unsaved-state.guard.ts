import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { PlanificationComponent } from '../pages/cecy/coordinator-cecy/planification/planification.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedStateGuard
  implements CanDeactivate<PlanificationComponent>
{
  constructor(private confirmationService: ConfirmationService) {}

  canDeactivate(component: PlanificationComponent): Promise<boolean> | boolean {
    console.log('Se activó el guard');

    if (
      component.formPlanification &&
      !this.isPlanificationApproved(component)
    ) {
      return new Promise<boolean>((resolve) => {
        console.log('Dentro del if del guard', resolve);
        this.confirmationService.confirm({
          message:
            '¿Estás seguro de que deseas abandonar el formulario sin aprobar o suspender la planificación?',
          accept: () => {
            resolve(false); // Bloquea la navegación
          },
          reject: () => {
            resolve(false); // Bloquea la navegación
          },
        });
      });
    }

    return true;
  }

  private isPlanificationApproved(component: PlanificationComponent): boolean {
    const state = component.formPlanification.get('state')?.value;
    return state === 'aprobado' || state === 'suspendido';
  }
}
