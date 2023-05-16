import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { InstructorModel } from '@models/cecy';
import { MessageService, UserAdministrationHttpService } from '@services/core';
import { DetailPlanificationHttpService, InstructorHttpService } from '@services/cecy';
import { UserModel } from '@models/core';

@Component({
    selector: 'app-assignment-instructors-form',
    templateUrl: './assignment-instructors-form.component.html',
    styleUrls: ['./assignment-instructors-form.component.scss']
})
export class AssignmentInstructorsFormComponent implements OnInit, OnDestroy {
    @Output() dialogLists = new EventEmitter<boolean>();

    sourceList: UserModel[] = [];
    targetList: UserModel[] = [];
    selectedInstructorsIds: number[] = [];

    private unsubscribe$ = new Subject<void>();

    public progressBar: boolean = false;

    constructor(private instructorHttpService: InstructorHttpService,
        private messageService: MessageService,
        private detailPlanificationHttpService: DetailPlanificationHttpService,
        private userAdministrationHttpService: UserAdministrationHttpService,
    ) { }

    ngOnInit() {
        this.loadUsersArentInstructors();
        this.loadUsersAreInstructors();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    loadUsersArentInstructors() {
        this.userAdministrationHttpService
            .getUsersArentInstructors()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(response => {
                this.sourceList = response.data;
                console.log(response);
            });
    }

    loadUsersAreInstructors() {
        this.userAdministrationHttpService
            .getUsersAreInstructors()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(response => {
                this.targetList = response.data;
            });
    }

    onSubmit() {
        this.progressBar = true;

        if (this.targetList.length <= 0) {
            this.progressBar = false;
            return;
        }

        // this.instructorHttpService
        //     .storeInstructors(this.userAdministrationHttpService.mapUsers(this.targetList))
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe({
        //         next: response => {
        //             this.messageService.success(response);
        //             this.progressBar = false;
        //             this.dialogLists.emit(false);
        //         },
        //         error: error => {
        //             this.messageService.error(error);
        //             this.progressBar = false;
        //             this.dialogLists.emit(false);
        //         }
        //     });
    }

}
