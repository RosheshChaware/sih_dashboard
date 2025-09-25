import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AssessmentResults from './pages/assessment-results';
import Login from './pages/login';
import CoachDashboard from './pages/coach-dashboard';
import AthleteProfile from './pages/athlete-profile';
import AthleteDashboard from './pages/athlete-dashboard';
import LiveAssessment from './pages/live-assessment';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AssessmentResults />} />
        <Route path="/assessment-results" element={<AssessmentResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coach-dashboard" element={<CoachDashboard />} />
        <Route path="/athlete-profile" element={<AthleteProfile />} />
        <Route path="/athlete-dashboard" element={<AthleteDashboard />} />
        <Route path="/live-assessment" element={<LiveAssessment />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
