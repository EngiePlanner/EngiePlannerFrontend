import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class TaskValidator {
    formErrors = new Map<string, string[]>();
    formValidators = new Map<
        string,
        (arg0: FormControl, arg1: string) => void
    >();

    constructor() {
        this.formValidators.set('Name', this.checkRequired);
        this.formValidators.set('Availability Date', this.checkRequired);
        this.formValidators.set('Planned Date', this.checkRequired);
        this.formValidators.set('Subteam', this.checkRequired);
        this.formValidators.set('Duration', this.checkRequired);
        this.formValidators.set('Employee', this.checkRequired);

        Array.from(this.formValidators.keys()).forEach((key) => {
            this.formErrors.set(key, []);
        });
    }

    async checkRequired(formControl: FormControl, targetInput: string): Promise<void> {
        const errors: string[] = [];

        if (formControl.errors?.required) {
            errors.push(targetInput + ' is required!');
        }

        this.formErrors.set(targetInput, errors);
    }

    clearErrors(): void {
        this.formErrors.set('Name', []);
        this.formErrors.set('Availability Date', []);
        this.formErrors.set('Planned Date', []);
        this.formErrors.set('Subteam', []);
        this.formErrors.set('Duration', []);
        this.formErrors.set('Employee', []);
    }

    validateFields(formControl: FormControl, targetInput: string): string[] {
        let errors: string[] = [];

        this.formValidators
            .get(targetInput)
            ?.call(this, formControl, targetInput);

        Array.from(this.formErrors.values()).forEach((value: string[]) => {
            errors = errors.concat(value);
        });

        return errors;
    }
}
