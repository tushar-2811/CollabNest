import { UseCase } from "@prisma/client";

export enum ActionType {
    CHANGE_SITE = "CHANGE_SITE",
    FIRSTNAME = "FIRSTNAME",
    LASTNAME = "LASTNAME",
    PROFILEIMAGE = "PROFILEIMAGE",
    USECASE = "USECASE",
    WORKSPACE = "WORKSPACE"
}

export interface Action {
    type : ActionType;
    payload : string | number | UseCase;
}

 export interface onboardingFormReducer {
    currentStep : 1 | 2 | 3;
    firstName ?: string | null;
    lastName ?: string | null;
    profileImage ?: string | null;
    useCase : UseCase | null;
    workspaceName : string | null;
 }

 export interface onboardingFormContext extends onboardingFormReducer {
    dispatch : React.Dispatch<Action>;
 }