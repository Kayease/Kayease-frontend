import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { contactApi } from '../../../utils/contactApi';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [recaptchaError, setRecaptchaError] = useState('');

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ecommerce', label: 'E-commerce Solution' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'branding', label: 'Branding & Design' },
    { value: 'consulting', label: 'Digital Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setRecaptchaError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';
    if (!formData.message.trim()) newErrors.message = 'Please describe your project';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    if (!recaptchaToken) {
      setRecaptchaError('Please verify that you are not a robot.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !!recaptchaToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Pass recaptchaToken to your API if needed
      const response = await contactApi.submit({ ...formData, recaptchaToken });
      
      // Show success toast
      toast.success(response.message || 'Thank you for your inquiry! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        terms: false
      });
      
      // Clear any existing errors
      setErrors({});
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Show error toast
      if (error.message.includes('already submitted')) {
        toast.error('You have already submitted a contact form recently. Please wait 24 hours before submitting again.');
      } else if (error.message.includes('Validation failed')) {
        toast.error('Please check your form data and try again.');
      } else {
        toast.error('Failed to submit your inquiry. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
      setRecaptchaToken('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-brand p-8 lg:p-10">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          Start Your Project
        </h3>
        <p className="text-text-secondary">
          Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
          />

          <Input
            label="Company Name"
            type="text"
            name="company"
            placeholder="Your Company (Optional)"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Project Type"
            placeholder="Select project type"
            options={projectTypes}
            value={formData.projectType}
            onChange={(value) => handleSelectChange('projectType', value)}
            error={errors.projectType}
            required
          />

          <Select
            label="Budget Range"
            placeholder="Select budget range"
            options={budgetRanges}
            value={formData.budget}
            onChange={(value) => handleSelectChange('budget', value)}
            error={errors.budget}
            required
          />
        </div>

        <Select
          label="Timeline"
          placeholder="When do you need this completed?"
          options={timelineOptions}
          value={formData.timeline}
          onChange={(value) => handleSelectChange('timeline', value)}
          description="This helps us plan resources and provide accurate timelines"
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project Description <span className="text-destructive">*</span>
          </label>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your project goals, requirements, and any specific features you need..."
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${
              errors.message ? 'border-destructive' : 'border-border'
            }`}
            required
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">{errors.message}</p>
          )}
        </div>

        <div className="space-y-4">
         
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            checked={formData.terms}
            onChange={(e) => handleInputChange(e)}
            name="terms"
            error={errors.terms}
            required
          />
        </div>

        {/* reCAPTCHA */}
        <div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
            onChange={handleRecaptchaChange}
            theme="light"
          />
          {recaptchaError && (
            <p className="mt-1 text-sm text-destructive">{recaptchaError}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            className="cta-button text-white font-medium"
          >
            {isSubmitting ? 'Sending...' : 'Send Project Inquiry'}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-accent" />
          <span>Your information is secure and will never be shared</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;