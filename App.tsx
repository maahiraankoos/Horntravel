
import React, { useState } from 'react';
import { InquiryData, Step, Passenger } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import TripDetails from './components/TripDetails';
import PassengerInfo from './components/PassengerInfo';
import Confirmation from './components/Confirmation';
import StepProgress from './components/StepProgress';
import LoadingOverlay from './components/LoadingOverlay';
import { GoogleGenAI } from "@google/genai";

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
  const [currentStep, setCurrentStep] = useState<Step>(Step.TripDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<InquiryData>({
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
    passengers: [initialPassenger()]
  });

  const nextStep = () => {
    if (currentStep === Step.TripDetails) {
      setCurrentStep(Step.PassengerInfo);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as the Lead Coordinator for Horn Travel Agency. 
        Format this travel inquiry into a professional internal brief for our ticketing team at info@horntravel.com.au.
        Include critical flight dates, passenger passport status, and stopover requirements.
        Data: ${JSON.stringify(data)}`,
      });

      const processedSummary = response.text || "Background Inquiry data processed.";

      const submissionPayload = {
        to: "info@horntravel.com.au",
        subject: `NEW INQUIRY: ${data.origin} to ${data.destination}`,
        summary: processedSummary,
        rawData: data,
        timestamp: new Date().toISOString()
      };

      // Simulate the background network call
      const mockResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(submissionPayload),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (!mockResponse.ok) throw new Error("Network dispatch failed");

      await new Promise(resolve => setTimeout(resolve, 2500));
      setCurrentStep(Step.Confirmation);
    } catch (error) {
      console.error("Silent submission failed:", error);
      alert("We encountered an error sending your inquiry automatically. Please try again or call us at 0410 374 786.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep === Step.PassengerInfo) {
      setCurrentStep(Step.TripDetails);
    }
  };

  const updateData = (updates: Partial<InquiryData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleRestart = () => {
    setCurrentStep(Step.TripDetails);
    setData({
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
      passengers: [initialPassenger()]
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {isSubmitting && <LoadingOverlay />}

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className={`text-center mb-10 ${currentStep === Step.Confirmation ? 'print:hidden' : ''}`}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Travel Inquiry</h1>
          <StepProgress currentStep={currentStep} />
        </div>

        {currentStep === Step.TripDetails && (
          <TripDetails 
            data={data} 
            onNext={nextStep} 
            onChange={updateData} 
          />
        )}

        {currentStep === Step.PassengerInfo && (
          <PassengerInfo 
            data={data} 
            onNext={handleFinalSubmit} 
            onBack={prevStep} 
            onChange={updateData}
          />
        )}

        {currentStep === Step.Confirmation && (
          <Confirmation data={data} onRestart={handleRestart} />
        )}

        {currentStep !== Step.Confirmation && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
            <FeatureCard 
              icon="verified" 
              title="Trusted Agency" 
              subtitle="IATA Accredited Member" 
            />
            <FeatureCard 
              icon="support_agent" 
              title="24/7 Support" 
              subtitle="Dedicated travel experts" 
            />
            <FeatureCard 
              icon="payments" 
              title="Secure Booking" 
              subtitle="Safe & encrypted payments" 
            />
          </div>
        )}
      </main>

      <Footer />
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
