import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgrammeService} from '../../../services/programme.service';
import {Programme} from '../../../models/programme.model';
import {Subscription} from 'rxjs';

const mobileScreenWidth = 720;

@Component({
    selector: 'app-add-new-programme',
    templateUrl: './add-new-programme.component.html',
    styleUrls: ['./add-new-programme.component.scss']
})
export class AddNewProgrammeComponent implements OnInit, OnDestroy {
    @ViewChild('modalAddProgramme') public templateRef: TemplateRef<any>;
    @Input() callbackFunction;
    timePerWeek: Array<number> = [1, 2, 3, 4, 5, 6, 7];
    programmeForm: FormGroup;
    programme: Programme;
    isEdit = false;
    programmeId: number;
    isMobile = false;

    private subscriptions = new Subscription();

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private programmeService: ProgrammeService) {
        this.subscriptions.add(this.route.params.subscribe(res => {
            if (res && Object.keys(res).length !== 0) {
                this.programmeId = +this.route.snapshot.paramMap.get('id');
                this.isEdit = true;
            }
        }));

        if (window.screen.width <= mobileScreenWidth) {
            this.isMobile = true;
        }
    }

    ngOnInit(): void {
        this.createForm();
        if (this.isEdit) {
            this.loadProgramme(this.programmeId);

        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    loadProgramme(id: number): void {
        this.subscriptions.add(this.programmeService.getProgramme(id).subscribe((res: Programme) => {
            this.programme = res;
            this.programme.date = new Date(this.programme.date);
            this.programme.exercises.map(e => e.reviewDate = new Date(e.reviewDate));

            this.programme.exercises.forEach((value, index, array) => {
                this.exercisesForm.push(this.newExercises());
                if (res.exercises[index]) {
                    this.progressionsForm(index).push(this.newProgression());
                }

                if (res.exercises[index].attachments) {
                    (res.exercises[index].attachments.forEach(() => {
                        this.attachmentForm(index).push(this.newAttach());
                    }));
                }
            });

            setTimeout(() => {
                this.programmeForm.patchValue(res);
            },);

        }));
    }

    private createForm(): void {
        this.programmeForm = this.fb.group({
            programmeName: ['', [Validators.required]],
            date: ['', [Validators.required]],
            goal: ['', [Validators.required]],
            exercises: this.fb.array(this.isEdit ? [] : [this.newExercises()])
        });

    }

    newExercises(): FormGroup {
        return this.fb.group({
            exerciseName: [''],
            reviewDate: [''],
            description: [''],
            initial: this.fb.group({
                reps: [''],
                timePerWeek: [''],
                timePeriod: [''],
            }),
            progressions: this.fb.array([]),
            attachments: this.fb.array([]),
        });
    }

    newProgression(): FormGroup {
        return this.fb.group({
            reps: [''],
            timePerWeek: [''],
            timePeriod: ['']
        });
    }

    newAttach(): FormGroup {
        return this.fb.group({
            filename: [''],
            date: [''],
            path: ['']
        });
    }

    onFileSelect(event, formGroup): void {
        const reader = new FileReader();
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);

            reader.onload = () => {
                const attach = formGroup.get('attachments') as FormArray;
                attach.push(this.fb.group({
                    filename: file.name.toString(),
                    date: new Date(),
                    path: reader.result.toString().split(',')[1]
                }));
            };
        }
    }

    getImage(image): string {
        return 'data:image/png;base64,' + image.path;
    }

    addProgramme(): void {
        if (this.programmeForm.invalid) {
            this.programmeForm.markAllAsTouched();
            return;
        }

        if (this.isEdit) {
            const programmeDTO = this.programmeForm.getRawValue();

            this.subscriptions.add(this.programmeService.updateProgramme(programmeDTO, this.programmeId).subscribe(res => {
                this.router.navigate(['/']);
            }));

            return;
        }

        const programmeDTO = this.programmeForm.getRawValue();

        this.subscriptions.add(this.programmeService.addProgramme(programmeDTO).subscribe(res => {
            this.router.navigate(['/']);
        }));
    }

    returnBack(): void {
        this.router.navigate(['/']);
    }

    addExercise(): void {
        const exercises = this.programmeForm.get('exercises') as FormArray;

        exercises.push(this.newExercises());
    }

    addProgression(exercise): void {
        const progressions = exercise.get('progressions') as FormArray;

        progressions.push(this.newProgression());
    }

    getExerciseAttach(exercise): void {
        return exercise.get('attachments').getRawValue();
    }

    deleteProgression(exercise, index): void {
        const progressions = exercise.get('progressions') as FormArray;
        progressions.removeAt(index);
    }

    get exercisesForm(): FormArray {
        return this.programmeForm.get('exercises') as FormArray;
    }

    private progressionsForm(index): FormArray {
        return this.programmeForm.get('exercises')['controls'][index].get('progressions') as FormArray;
    }

    private attachmentForm(index): FormArray {
        return this.programmeForm.get('exercises')['controls'][index].get('attachments') as FormArray;
    }
}
