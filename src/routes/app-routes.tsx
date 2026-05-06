import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { LazyLoading } from '~/components/Loading/LazyLoading';
import { ProtectedRoute } from './protected-route';

// Lazy load pages by feature
const Home = lazy(() => import('~/pages/Home'));
const Auth = {
  Login: lazy(() => import('~/pages/Login')),
  Register: lazy(() => import('~/pages/Register')),
  ResetPassword: lazy(() => import('~/pages/ResetPassword')),
  RecoverPassword: lazy(() => import('~/pages/RecoverPassword')),
  ValidCode: lazy(() => import('~/pages/ValidCode')),
};
const Shop = {
  Plans: lazy(() => import('~/pages/Plans')),
  Checkout: lazy(() => import('~/pages/Checkout')),
};
const Content = {
  Categories: lazy(() => import('~/pages/Categories')),
  Collections: lazy(() => import('~/pages/Collections')),
  Search: lazy(() => import('~/pages/Search')),
  ResultSearch: lazy(() => import('~/pages/ResultSearch')),
  SearchImage: lazy(() => import('~/pages/SearchImage')),
};
const User = {
  Profile: lazy(() => import('~/pages/Profile')),
};
const PrivacyPolicyPages = lazy(() => import('~/pages/PrivacyPolicy'));
const TermsPage = lazy(() => import('~/pages/Terms'));
const AboutPage = lazy(() => import('~/pages/About'));
const DownloadPage = lazy(() => import('~/pages/Download'));
const DownloadFreePage = lazy(() => import('~/pages/Download/Free.tsx'));
const PartnershipPage = lazy(() => import('~/pages/Partnership'));

// Blog
const Blog = {
  List: lazy(() => import('~/pages/Blog')),
  Post: lazy(() => import('~/pages/Blog/Post')),
};

export const AppRoutes: React.FC = () => {
  useParams<{
    termValue?: string;
    formatValue?: string;
  }>();

  // Redirect www -> non-www in client as a safety net (server does it via .htaccess)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { hostname, pathname, search, hash } = window.location;
    const isWww = hostname.startsWith('www.');
    const isFlix = hostname.endsWith('flixdesign.com.br');
    if (isWww && isFlix) {
      const naked = hostname.replace(/^www\./, '');
      const target = `https://${naked}${pathname}${search}${hash}`;
      window.location.replace(target);
    }
  }, []);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Auth.Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Auth.Register />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Auth.ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/recover-password"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Auth.RecoverPassword />
            </Suspense>
          }
        />
        <Route
          path="/valid-code"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Auth.ValidCode />
            </Suspense>
          }
        />

        {/* Shop Routes */}
        <Route
          path="/plans"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Shop.Plans />
            </Suspense>
          }
        />

        {/* Download Page */}
        <Route
          path="/download/:itemId"
          element={
            <Suspense fallback={<LazyLoading />}>
              <DownloadPage />
            </Suspense>
          }
        />
        <Route
          path="/download-free/:itemId"
          element={
            <Suspense fallback={<LazyLoading />}>
              <DownloadFreePage />
            </Suspense>
          }
        />

        {/* Content Routes */}
        <Route
          path="/categories"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Content.Categories />
            </Suspense>
          }
        />
        {/* Legacy redirect from /collections to /gallery-free */}
        <Route path="/collections" element={<Navigate to="/gallery-free" replace />} />
        <Route
          path="/gallery-free"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Content.Collections />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<LazyLoading />}>
              <PrivacyPolicyPages />
            </Suspense>
          }
        />

        {/* Blog Routes */}
        <Route
          path="/blog"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Blog.List />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Blog.Post />
            </Suspense>
          }
        />
        <Route
          path="/result/search"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Content.ResultSearch />
            </Suspense>
          }
        />
        <Route
          path="/search/:categoryId"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Content.Search />
            </Suspense>
          }
        />
        <Route
          path="/searchImage/:termValue/:formatValue"
          element={
            <Suspense fallback={<LazyLoading />}>
              <Content.SearchImage />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<LazyLoading />}>
              <TermsPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LazyLoading />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/partnership"
          element={
            <Suspense fallback={<LazyLoading />}>
              <PartnershipPage />
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<LazyLoading />}>
                <Shop.Checkout />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<LazyLoading />}>
                <User.Profile />
              </Suspense>
            }
          />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
