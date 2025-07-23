// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Blog from "./pages/Blog";
// import BlogPost from "./pages/BlogPost";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import NotFound from "./pages/NotFound";
// import ScrollToTop from "@/components/ScrollToTop";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <ScrollToTop />   {/* ✅ scrolls to top on route change */}
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:slug" element={<BlogPost />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

// ✅ GA import
import ReactGA from "react-ga4";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const queryClient = new QueryClient();

// ✅ Initialize GA once (replace with your GA Measurement ID)
ReactGA.initialize("G-CTZLHPR470");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />         {/* scrolls to top on route change */}
        <AnalyticsTracker />    {/* ✅ tracks pageviews on route change */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
