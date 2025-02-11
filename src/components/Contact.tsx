import { Container } from '../components/ui/Container';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '../lib/validation';
import { Alert } from '../components/ui/Alert';
import { useState } from 'react';
import DOMPurify from 'dompurify';

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const sanitizeFormData = (data: ContactFormData): ContactFormData => {
    return {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      phone: DOMPurify.sanitize(data.phone),
      message: DOMPurify.sanitize(data.message)
    };
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    try {
      const sanitizedData = sanitizeFormData(data);
      
      // Hier würde normalerweise der API-Aufruf stattfinden
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', sanitizedData);
      setSubmitStatus('success');
      reset();
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.');
    }
  };

  // Rest of the component remains the same...
}