
import React, { useState, useEffect } from 'react';
import { InquiryData, Step, Passenger, InquiryRecord, AppView } from './types.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import TripDetails from './components/TripDetails.tsx';
import PassengerInfo from './components/PassengerInfo.tsx';
import Confirmation from './components/Confirmation.tsx';
import StepProgress from './components/StepProgress.tsx';
import LoadingOverlay from './components/LoadingOverlay.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import ManageInquiry from './components/ManageInquiry.tsx';
import { GoogleGenAI } from "@google/genai";

const DB_KEY = 'horntravel_inquiries_db';

const initialPassenger = (): Passenger => ({
  id: Math.random().toString(36).substr(2, 9),
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  passportNumber: '',
  expiryDate: '',
  nationality: 'Australia'
});

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.Booking);
  const [currentStep, setCurrentStep] = useState<Step>(Step.TripDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<InquiryData>({
    tripType: 'round-trip',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    needStopover: false,
    stopoverLocation: '',
    stopoverDuration: '2 Days',
    specialRequests: '',
    agentCode: '',
    passengers: [initialPassenger()]
  });

  const saveToDatabase = (newData: InquiryData) => {
    const existing = localStorage.getItem(DB_KEY);
    const db: InquiryRecord[] = existing ? JSON.parse(existing) : [];
    
    const record: InquiryRecord = {
      ...newData,
      id: `#TRV-${Math.floor(10000 + Math.random() * 90000)}`,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };
    
    db.unshift(record);
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      saveToDatabase(data);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional travel inquiry email for info@horntravel.com.au. 
        Details: ${data.tripType === 'round-trip' ? 'Round Trip' : 'One Way'} from ${data.origin} to ${data.destination}, ${data.departureDate} ${data.tripType === 'round-trip' ? 'to ' + data.returnDate : ''}.
        Travelers: ${data.adults}A, ${data.children}C, ${data.infants}I.
        Passengers: ${data.passengers.map(p => p.fullName).join(', ')}.
        Agent Code: ${data.agentCode || 'None'}.
        Special Requests: ${data.specialRequests || 'None'}.
        Return ONLY the email body.`,
      });

      const emailBody = response.text || "New Travel Inquiry received.";
      const subject = encodeURIComponent(`New Travel Inquiry: ${data.origin} to ${data.destination}`);
      const mailtoUrl = `mailto:info@horntravel.com.au?subject=${subject}&body=${encodeURIComponent(emailBody)}`;

      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.href = mailtoUrl;
      setCurrentStep(Step.Confirmation);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was an issue. We saved your inquiry locally, but the email couldn't open. Our team will check the records.");
      setCurrentStep(Step.Confirmation);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => { if (currentStep === Step.TripDetails) setCurrentStep(Step.PassengerInfo); };
  const prevStep = () => { if (currentStep === Step.PassengerInfo) setCurrentStep(Step.TripDetails); };
  const updateData = (updates: Partial<InquiryData>) => { setData(prev => ({ ...prev, ...updates })); };
  
  const handleRestart = () => {
    setCurrentStep(Step.TripDetails);
    setView(AppView.Booking);
    setData({
      tripType: 'round-trip', origin: '', destination: '', departureDate: '', returnDate: '',
      adults: 1, children: 0, infants: 0, needStopover: false,
      stopoverLocation: '', stopoverDuration: '2 Days', specialRequests: '', agentCode: '',
      passengers: [initialPassenger()]
    });
  };

  if (view === AppView.Login) {
    return (
      <AdminLogin 
        onLoginSuccess={() => setView(AppView.Admin)} 
        onCancel={() => setView(AppView.Booking)} 
      />
    );
  }

  if (view === AppView.Admin) {
    return <AdminDashboard onExit={() => setView(AppView.Booking)} />;
  }

  if (view === AppView.ManageInquiry) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header onManageClick={() => setView(AppView.ManageInquiry)} onHomeClick={handleRestart} />
        <ManageInquiry onBack={handleRestart} />
        <Footer onAdminClick={() => setView(AppView.Login)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onManageClick={() => setView(AppView.ManageInquiry)} onHomeClick={handleRestart} />
      {isSubmitting && <LoadingOverlay />}

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className={`text-center mb-10 ${currentStep === Step.Confirmation ? 'print:hidden' : ''}`}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Travel Inquiry</h1>
          <StepProgress currentStep={currentStep} />
        </div>

        {currentStep === Step.TripDetails && (
          <TripDetails data={data} onNext={nextStep} onChange={updateData} />
        )}

        {currentStep === Step.PassengerInfo && (
          <PassengerInfo data={data} onNext={handleFinalSubmit} onBack={prevStep} onChange={updateData} />
        )}

        {currentStep === Step.Confirmation && (
          <Confirmation data={data} onRestart={handleRestart} />
        )}

        {currentStep !== Step.Confirmation && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
            <FeatureCard icon="verified" title="Trusted Agency" subtitle="IATA Accredited Member" />
            <FeatureCard icon="support_agent" title="24/7 Support" subtitle="Dedicated travel experts" />
            <FeatureCard icon="payments" title="Secure Booking" subtitle="Safe & encrypted payments" />
          </div>
        )}
      </main>

      <Footer onAdminClick={() => setView(AppView.Login)} />
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-slate-100 shadow-sm">
    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
      <span className="material-icons-round">{icon}</span>
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

export default App;
