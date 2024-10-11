import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-4 text-center">Subscribe to Our Newsletter</h2>
        <p className="text-gray-300 text-center mb-6">Get a weekly sports factoid delivered to your inbox!</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-md focus:outline-none bg-gray-700 text-gray-100"
            required
          />
          <button type="submit" className="bg-blue-600 text-gray-100 px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300 flex items-center">
            <Send className="mr-2" /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;