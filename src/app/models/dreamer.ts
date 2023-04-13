export interface Dreamer {
    id:number
    dreamerId:string
    firstName:string
    lastName:string
    email:string
    password:string
    dateOfBirth:Date
    gender:string
    profileImageUrl:string
    profileImage:File
    lastLoginDateDisplay:Date
    joinDate:Date
    role:string
    authorities:[]
    isActive:boolean
    isNotLocked:boolean
}

export interface PasswordReset {
    currentPassword:string
    newPassword:string
    confirmPassword:string
    email:string
}

export interface DeleteAccount {
    message:string
    email:string
    password:string
}
