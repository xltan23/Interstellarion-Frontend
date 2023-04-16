export interface Planet {
    name:string
    mass:number
    radius:number
    period:number
    semi_major_axis:number
    temperature:number
    distance_light_year:number
    host_star_mass:number
    host_star_temperature:number
    gravity:number
    solar_insolation:number
    star_type:string
    travel_time:number
    cost:number
    description:string
    thumbnailUrl:string
    coverUrl:string
}

export interface PlanetSearch {
    searchTerm:string
    min_mass:number
    max_mass:number
    min_semi_major_axis:number
    max_semi_major_axis:number
    max_distance_light_year:number
}