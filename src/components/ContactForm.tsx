'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  t: (key: string, options?: any) => string;
}

export default function ContactForm({ t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('contact.form.success.title', { defaultValue: 'Message Sent!' })}
        </h3>
        <p className="text-gray-600">
          {t('contact.form.success.message', { 
            defaultValue: 'Thank you for your message. We\'ll get back to you within 24 hours.' 
          })}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          {t('contact.form.success.sendAnother', { defaultValue: 'Send another message' })}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.name', { defaultValue: 'Name' })}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('contact.form.namePlaceholder', { defaultValue: 'Your name' })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.email', { defaultValue: 'Email' })}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('contact.form.emailPlaceholder', { defaultValue: 'your@email.com' })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.company', { defaultValue: 'Company' })}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('contact.form.companyPlaceholder', { defaultValue: 'Your company (optional)' })}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.subject', { defaultValue: 'Subject' })}
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('contact.form.subjectPlaceholder', { defaultValue: 'Select a subject' })}</option>
            <option value="general">{t('contact.form.subjects.general', { defaultValue: 'General Inquiry' })}</option>
            <option value="enterprise">{t('contact.form.subjects.enterprise', { defaultValue: 'Enterprise Solutions' })}</option>
            <option value="partnership">{t('contact.form.subjects.partnership', { defaultValue: 'Partnership' })}</option>
            <option value="support">{t('contact.form.subjects.support', { defaultValue: 'Technical Support' })}</option>
            <option value="feedback">{t('contact.form.subjects.feedback', { defaultValue: 'Feedback' })}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.message', { defaultValue: 'Message' })}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t('contact.form.messagePlaceholder', { 
            defaultValue: 'Tell us about your inquiry or how we can help you...' 
          })}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {t('contact.form.privacy', { 
            defaultValue: 'By submitting this form, you agree to our privacy policy.' 
          })}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{t('contact.form.sending', { defaultValue: 'Sending...' })}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t('contact.form.send', { defaultValue: 'Send Message' })}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
} 