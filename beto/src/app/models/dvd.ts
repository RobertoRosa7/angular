import { Moment } from 'moment';

export interface Dvd {
    title: string,
    year: number | Date | Moment | string,
    genre: string
}
