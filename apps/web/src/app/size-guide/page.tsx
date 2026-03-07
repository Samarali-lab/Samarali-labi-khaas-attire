import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect size with our detailed Khaas Attire size guide for women, men, and kids.',
};

const WOMEN_SIZES = [
  { size: 'XS', chest: '32"', waist: '26"', hips: '35"', pkSize: '6-8' },
  { size: 'S', chest: '34"', waist: '28"', hips: '37"', pkSize: '8-10' },
  { size: 'M', chest: '36"', waist: '30"', hips: '39"', pkSize: '10-12' },
  { size: 'L', chest: '38"', waist: '32"', hips: '41"', pkSize: '12-14' },
  { size: 'XL', chest: '40"', waist: '34"', hips: '43"', pkSize: '14-16' },
  { size: 'XXL', chest: '42"', waist: '36"', hips: '45"', pkSize: '16-18' },
  { size: 'XXXL', chest: '44"', waist: '38"', hips: '47"', pkSize: '18-20' },
];

const MEN_SIZES = [
  { size: 'S', chest: '36"', shoulder: '17"', length: '43"', pkSize: '38' },
  { size: 'M', chest: '38"', shoulder: '18"', length: '44"', pkSize: '40' },
  { size: 'L', chest: '40"', shoulder: '19"', length: '45"', pkSize: '42' },
  { size: 'XL', chest: '42"', shoulder: '20"', length: '46"', pkSize: '44' },
  { size: 'XXL', chest: '44"', shoulder: '21"', length: '47"', pkSize: '46' },
  { size: 'XXXL', chest: '46"', shoulder: '22"', length: '48"', pkSize: '48' },
];

const KIDS_SIZES = [
  { size: '2-3Y', height: '92-98 cm', chest: '21"', age: '2-3 years' },
  { size: '4-5Y', height: '104-110 cm', chest: '23"', age: '4-5 years' },
  { size: '6-7Y', height: '116-122 cm', chest: '25"', age: '6-7 years' },
  { size: '8-9Y', height: '128-134 cm', chest: '27"', age: '8-9 years' },
  { size: '10-11Y', height: '140-146 cm', chest: '29"', age: '10-11 years' },
  { size: '12-13Y', height: '152-158 cm', chest: '31"', age: '12-13 years' },
];

export default function SizeGuidePage() {
  return (
    <div className="bg-brand-ivory">
      {/* Header */}
      <section className="bg-brand-charcoal py-16 text-center">
        <div className="container-brand max-w-2xl">
          <h1 className="heading-xl text-white mb-3">Size Guide</h1>
          <p className="text-gray-400">
            Find your perfect fit with our detailed measurements guide.
          </p>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-5xl">
          {/* Measurement tips */}
          <div className="mb-12 bg-white p-6">
            <h2 className="heading-sm mb-4">How to Measure</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: 'Chest / Bust', tip: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
                { label: 'Waist', tip: 'Measure around the narrowest part of your waist, about 1 inch above your belly button.' },
                { label: 'Hips', tip: 'Measure around the fullest part of your hips, about 8 inches below your waist.' },
              ].map(({ label, tip }) => (
                <div key={label} className="bg-brand-ivory p-4">
                  <h3 className="mb-1 text-sm font-semibold text-brand-maroon">{label}</h3>
                  <p className="text-xs text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Women's sizes */}
          <div className="mb-10">
            <h2 className="heading-sm mb-4">Women&apos;s Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white text-sm">
                <thead className="bg-brand-maroon text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Chest</th>
                    <th className="px-4 py-3 text-left font-semibold">Waist</th>
                    <th className="px-4 py-3 text-left font-semibold">Hips</th>
                    <th className="px-4 py-3 text-left font-semibold">PK Size</th>
                  </tr>
                </thead>
                <tbody>
                  {WOMEN_SIZES.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-ivory'}>
                      <td className="px-4 py-3 font-semibold text-brand-maroon">{row.size}</td>
                      <td className="px-4 py-3 text-gray-600">{row.chest}</td>
                      <td className="px-4 py-3 text-gray-600">{row.waist}</td>
                      <td className="px-4 py-3 text-gray-600">{row.hips}</td>
                      <td className="px-4 py-3 text-gray-600">{row.pkSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's sizes */}
          <div className="mb-10">
            <h2 className="heading-sm mb-4">Men&apos;s Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white text-sm">
                <thead className="bg-brand-charcoal text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Chest</th>
                    <th className="px-4 py-3 text-left font-semibold">Shoulder</th>
                    <th className="px-4 py-3 text-left font-semibold">Length</th>
                    <th className="px-4 py-3 text-left font-semibold">PK Size</th>
                  </tr>
                </thead>
                <tbody>
                  {MEN_SIZES.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-ivory'}>
                      <td className="px-4 py-3 font-semibold text-brand-charcoal">{row.size}</td>
                      <td className="px-4 py-3 text-gray-600">{row.chest}</td>
                      <td className="px-4 py-3 text-gray-600">{row.shoulder}</td>
                      <td className="px-4 py-3 text-gray-600">{row.length}</td>
                      <td className="px-4 py-3 text-gray-600">{row.pkSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kids' sizes */}
          <div className="mb-10">
            <h2 className="heading-sm mb-4">Kids&apos; Sizes</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white text-sm">
                <thead className="bg-brand-gold">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-white">Size</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Height</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Chest</th>
                    <th className="px-4 py-3 text-left font-semibold text-white">Age Group</th>
                  </tr>
                </thead>
                <tbody>
                  {KIDS_SIZES.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-ivory'}>
                      <td className="px-4 py-3 font-semibold text-brand-gold-dark">{row.size}</td>
                      <td className="px-4 py-3 text-gray-600">{row.height}</td>
                      <td className="px-4 py-3 text-gray-600">{row.chest}</td>
                      <td className="px-4 py-3 text-gray-600">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-brand-maroon/5 border border-brand-maroon/20 p-5 text-sm text-gray-600">
            <p className="font-semibold text-brand-maroon mb-1">Not sure of your size?</p>
            <p>
              Contact us on{' '}
              <a href={`https://wa.me/923001234567`} className="text-brand-maroon hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>{' '}
              or{' '}
              <Link href="/contact" className="text-brand-maroon hover:underline">
                send us a message
              </Link>{' '}
              with your measurements and we&apos;ll help you choose the right size.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
