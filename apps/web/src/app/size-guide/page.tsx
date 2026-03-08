import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Pakistani clothing size chart and measurement guide.',
};

export default function SizeGuidePage() {
  const sizes = [
    { size: 'XS', chest: '32"', waist: '26"', hips: '35"', height: '5\'0"–5\'3"' },
    { size: 'S', chest: '34"', waist: '28"', hips: '37"', height: '5\'2"–5\'5"' },
    { size: 'M', chest: '36"', waist: '30"', hips: '39"', height: '5\'4"–5\'6"' },
    { size: 'L', chest: '38"', waist: '32"', hips: '41"', height: '5\'5"–5\'7"' },
    { size: 'XL', chest: '40"', waist: '34"', hips: '43"', height: '5\'6"–5\'8"' },
    { size: 'XXL', chest: '42"', waist: '36"', hips: '45"', height: '5\'7"–5\'9"' },
    { size: '3XL', chest: '44"', waist: '38"', hips: '47"', height: '5\'8"–5\'10"' },
  ];

  return (
    <div className="container-brand py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-brand-charcoal mb-4">Size Guide</h1>
        <p className="text-gray-600">Find your perfect fit with our Pakistani clothing size chart</p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-brand-charcoal text-white">
              {['Size', 'Chest', 'Waist', 'Hips', 'Height'].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-sm font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((row, i) => (
              <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 font-bold text-brand-maroon">{row.size}</td>
                <td className="px-6 py-4 text-sm">{row.chest}</td>
                <td className="px-6 py-4 text-sm">{row.waist}</td>
                <td className="px-6 py-4 text-sm">{row.hips}</td>
                <td className="px-6 py-4 text-sm">{row.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-brand-ivory p-6">
        <h2 className="font-serif text-xl font-bold text-brand-charcoal mb-4">How to Measure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-medium text-brand-charcoal mb-2">Chest</h3>
            <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          </div>
          <div>
            <h3 className="font-medium text-brand-charcoal mb-2">Waist</h3>
            <p>Measure around your natural waist, the narrowest part of your torso.</p>
          </div>
          <div>
            <h3 className="font-medium text-brand-charcoal mb-2">Hips</h3>
            <p>Measure around the fullest part of your hips, about 8 inches below your waist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
