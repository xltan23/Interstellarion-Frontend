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
    lastLoginDateDisplay:Date
    joinDate:Date
    role:string
    authorities:[]
    isActive:boolean
    isNotLocked:boolean
}
