
export interface Passenger {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  passportNumber: string;
  expiryDate: string;
  nationality: string;
  passportPhoto?: string; // Base64 string
}

export interface InquiryData {
  tripType: 'round-trip' | 'one-way';
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
  agentCode: string;
  passengers: Passenger[];
}

export interface InquiryRecord extends InquiryData {
  id: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export enum Step {
  TripDetails = 1,
  PassengerInfo = 2,
  Confirmation = 3
}

export enum AppView {
  Booking = 'booking',
  Login = 'login',
  Admin = 'admin',
  ManageInquiry = 'manage'
}
