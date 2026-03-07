'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^(\+92|0092|92|0)(3\d{9})$/, 'Enter a valid Pakistani phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((v) => v, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (_data: RegisterFormValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-brand-ivory px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-4 text-5xl">🎉</div>
          <h1 className="heading-md mb-3">Account Created!</h1>
          <p className="mb-6 text-gray-500">
            Welcome to the Khaas Attire family! You can now sign in to your account.
          </p>
          <Link href="/account/login" className="btn-primary inline-flex">
            Sign In to Your Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-brand-ivory px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-6">
            <span className="font-playfair text-2xl font-bold text-brand-maroon">
              Khaas <span className="text-brand-gold">Attire</span>
            </span>
          </Link>
          <h1 className="heading-md">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Join the Khaas Attire family for exclusive offers
          </p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="Sara Khan"
              autoComplete="name"
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="sara@example.com"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="03001234567"
              autoComplete="tel"
              {...register('phone')}
              error={errors.phone?.message}
              hint="Pakistani mobile number (for order updates)"
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="At least 8 characters"
              autoComplete="new-password"
              {...register('password')}
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-brand-maroon transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="Re-enter your password"
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="hover:text-brand-maroon transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            <div>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-brand-maroon"
                  {...register('agreeToTerms')}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-brand-maroon hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-brand-maroon hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms.message}</p>
              )}
            </div>

            <Button type="submit" fullWidth loading={isLoading} size="lg">
              Create Account
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/account/login" className="font-medium text-brand-maroon hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
