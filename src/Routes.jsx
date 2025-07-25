import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import UserAuthenticationLoginRegister from "./pages/user-authentication-login-register";
import AiToolsMarketplaceDashboard from "./pages/ai-tools-marketplace-dashboard";
import AiToolDetailProfile from "./pages/ai-tool-detail-profile";
import AdminModerationDashboard from "./pages/admin-moderation-dashboard";
import AdvancedSearchAndFiltering from "./pages/advanced-search-and-filtering";
import CommunityContributionWorkflow from "./pages/community-contribution-workflow";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AiToolsMarketplaceDashboard />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/ai-tools-marketplace-dashboard" element={<AiToolsMarketplaceDashboard />} />
        <Route path="/ai-tool-detail-profile" element={<AiToolDetailProfile />} />
        <Route path="/admin-moderation-dashboard" element={<AdminModerationDashboard />} />
        <Route path="/advanced-search-and-filtering" element={<AdvancedSearchAndFiltering />} />
        <Route path="/community-contribution-workflow" element={<CommunityContributionWorkflow />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;