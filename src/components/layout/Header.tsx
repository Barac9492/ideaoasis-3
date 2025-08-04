'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, User, LogIn, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  const navigation = [
    { name: t('ideas'), href: '/ideas' },
    { name: t('about'), href: '/about' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Ideaoasis</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-4"
          >
            <LanguageSwitcher />
            <button className="btn btn-ghost btn-sm">
              <LogIn className="w-4 h-4 mr-2" />
              {t('login')}
            </button>
            <button className="btn btn-primary btn-sm">
              <User className="w-4 h-4 mr-2" />
              {t('signup')}
            </button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
                <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <LogIn className="w-4 h-4 mr-2 inline" />
                  {t('login')}
                </button>
                <button className="w-full text-left px-3 py-2 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200 mt-2">
                  <User className="w-4 h-4 mr-2 inline" />
                  {t('signup')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
} 