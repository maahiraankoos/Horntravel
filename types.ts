
export interface Passenger {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  passportNumber: string;
  expiryDate: string;
  nationality: string;
}

export interface InquiryData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  needStopover: boolean;
  stopoverLocation: string;
  stopoverDuration: string;
  specialRequests: string;
  passengers: Passenger[];
}

export enum Step {
  TripDetails = 1,
  PassengerInfo = 2,
  Confirmation = 3
}
