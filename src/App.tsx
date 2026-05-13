// import { useEffect, useLayoutEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Lenis from 'lenis';

// import Navbar from './components/Navbar';
// import Footer from './components/footer/Footer';
// // import Particles from './Particles';

// // import FamilyTree from './components/FamilyTree';

// import HeroSubscribe from './components/HeroSubscribe';
// // import TheQuote from './components/TheQuote';

// // import SiteFeatures from './components/SiteFeatures';
// import ForumPreview from './components/ForumPreview';
// import TimelineCarousel from './components/Trending';
// import TheEras from './components/TheEras';
// import TheErasPage from './components/TheErasPage';
// // import LegacyShowcase from './components/LegacyShowcase';
// import Blogs from './components/Blogs';

// import AboutPage from './components/footer/AboutPage';
// import ContactPage from './components/footer/ContactPage';
// import DonatePage from './components/footer/DonatePage';

// // Blog Pages
// import BlogPage from './components/BlogPage';
// import PostDetail from './components/PostDetail';

// import VideosPage from './components/VideosPage';
// import VideosDetail from './components/VideosDetail';

// import AudioPage from './components/AudioPage';
// import AudioDetail from './components/AudioDetail';

// import LegacyShowcaseDetail from './components/TheErasDetail';

// import ForumPage from './components/ForumPage';

// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import VerifyOTP from './components/auth/VerifyOTP';
// import ForgotPassword from './components/auth/ForgotPassword';
// import ResetPasswordOTP from './components/auth/ResetPasswordOTP';
// import NewPassword from './components/auth/NewPassword';
// import FamilyDetailPage from './components/family/FamilyDetailPage';
// import FamilyPage from './components/family/FamilyPage';
// import ProfilePage from './components/profile/ProfilePage';

// function AppLayout() {
//   const location = useLocation();

//   const authRoutes = [
//     '/login',
//     '/register',
//     '/verify-otp',
//     '/forgot-password',
//     '/reset-password-otp',
//     '/new-password'
//   ];

//   const isAuthRoute = authRoutes.includes(location.pathname);

//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <div className="relative z-10 flex flex-col flex-grow">
//       {!isAuthRoute && <Navbar />}

//       <main className="flex-grow">
//         <Routes>
//           {/* Home Page */}
//           <Route path="/" element={
//             <>
//               <HeroSubscribe />
//               <TimelineCarousel />
//               <TheEras />
//               {/* <TheQuote /> */}
//               {/* <LegacyShowcase /> */}
//               {/* <SiteFeatures /> */}
//               {/* <FamilyTree /> */}
//               <Blogs />
//               <ForumPreview />
//             </>
//           } />

//           {/* Blog Routes */}
//           <Route path="/articles" element={<BlogPage />} />
//           <Route path="/articles/:slug" element={<PostDetail />} />

//           <Route path="/videos" element={<VideosPage />} />
//           <Route path="/videos/:slug" element={<VideosDetail />} />

//           <Route path="/audio" element={<AudioPage />} />
//           <Route path="/audio/:slug" element={<AudioDetail />} />

//           <Route path="/legacy/:id" element={<LegacyShowcaseDetail />} />
//           <Route path="/legacy" element={<TheErasPage />} />

//           {/* The Dynasty (Family) */}
//           <Route path="/family" element={<FamilyPage />} />
//           <Route path="/family/:id" element={<FamilyDetailPage />} />

//           <Route path="/profile" element={<ProfilePage />} />

//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/donate" element={<DonatePage />} />

//           <Route path="/forum" element={<ForumPage />}>
//             <Route path=":threadId" element={<ForumPage />} />
//           </Route>

//           {/* Auth Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password-otp" element={<ResetPasswordOTP />} />
//           <Route path="/new-password" element={<NewPassword />} />
//         </Routes>
//       </main>

//       {!isAuthRoute && <Footer />}
//     </div>
//   );
// }

// export default function App() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const parallaxElements = document.querySelectorAll('.parallax');
//       parallaxElements.forEach((element) => {
//         const speed = 0.5;
//         const yPos = window.pageYOffset * speed;
//         (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen bg-mj-black relative overflow-hidden flex flex-col">
//         {/* <Particles /> */}
//         <AppLayout />
//       </div>
//     </Router>
//   );
// }





















import { useEffect, useLayoutEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// ─ CONTEXT ─
import { useAuth } from './context/AuthContext';

// ─ COMPONENTS ─
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import HeroSubscribe from './components/HeroSubscribe';
import ForumPreview from './components/ForumPreview';
import TimelineCarousel from './components/Trending';
import TheEras from './components/TheEras';
import Blogs from './components/Blogs';

// ─ PAGES ─
import BlogPage from './components/BlogPage';
import PostDetail from './components/PostDetail';
import VideosPage from './components/VideosPage';
import VideosDetail from './components/VideosDetail';
import AudioPage from './components/AudioPage';
import AudioDetail from './components/AudioDetail';
import TheErasPage from './components/TheErasPage';
import LegacyShowcaseDetail from './components/TheErasDetail';
import ForumPage from './components/ForumPage';
import FamilyPage from './components/family/FamilyPage';
import FamilyDetailPage from './components/family/FamilyDetailPage';
import AboutPage from './components/footer/AboutPage';
import ContactPage from './components/footer/ContactPage';
import DonatePage from './components/footer/DonatePage';

// ─ AUTHENTICATION ─
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyOTP from './components/auth/VerifyOTP';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPasswordOTP from './components/auth/ResetPasswordOTP';
import NewPassword from './components/auth/NewPassword';
import ProfilePage from './components/profile/ProfilePage';

// ─ CONFIGURATION ─
const FONT = 'Georgia, serif';

// PROTECTED ROUTE
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div 
        className="min-h-screen bg-mj-black flex items-center justify-center text-white/50"
        style={{ fontFamily: FONT, letterSpacing: '0.2em' }}
      >
        LOADING_DOSSIER...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// APP LAYOUT
function AppLayout() {
  const location = useLocation();

  const authRoutes = [
    '/login',
    '/register',
    '/verify-otp',
    '/forgot-password',
    '/reset-password-otp',
    '/new-password'
  ];
  
  const isAuthRoute = authRoutes.includes(location.pathname);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative z-10 flex flex-col flex-grow">
      
      {!isAuthRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* ─ HOME PAGE ─ */}
          <Route path="/" element={
            <>
              <HeroSubscribe />
              <TimelineCarousel />
              <TheEras />
              <Blogs />
              <ForumPreview />
            </>
          } />

          {/* ─ MEDIA ─ */}
          <Route path="/articles" element={<BlogPage />} />
          <Route path="/articles/:slug" element={<PostDetail />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:slug" element={<VideosDetail />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/audio/:slug" element={<AudioDetail />} />

          {/* ─ LEGACY ─ */}
          <Route path="/legacy" element={<TheErasPage />} />
          <Route path="/legacy/:id" element={<LegacyShowcaseDetail />} />

          {/* ─ FAMILY ─ */}
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/family/:id" element={<FamilyDetailPage />} />

          {/* ─ PROFILE ─ */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* ─ FORUM ─ */}
          <Route path="/forum" element={<ForumPage />}>
            <Route path=":threadId" element={<ForumPage />} />
          </Route>

          {/* ─ INFO PAGES ─ */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />

          {/* ─ AUTHENTICATION ─ */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password-otp" element={<ResetPasswordOTP />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </main>

      {!isAuthRoute && <Footer />}
    </div>
  );
}

// ROOT APP COMPONENT
export default function App() {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = window.pageYOffset * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-mj-black relative overflow-hidden flex flex-col">
        <AppLayout />
      </div>
    </Router>
  );
}