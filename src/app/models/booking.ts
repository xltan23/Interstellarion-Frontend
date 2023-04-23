export interface Booking {
    dreamerId:string
    planet:string
    planetThumbnail:string
    numberOfPax:number
    travelDate:Date
    stringDate:string
    totalCost:number
}

export interface PaymentResponse {
    redirectUrl:string
    status:string
}
