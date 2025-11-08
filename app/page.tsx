'use client';

import Link from 'next/link';
import { ShoppingCart, Mail, Sparkles, Users, Wifi, Globe, Code, Heart, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zuki Apps
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Mobile App Developer from Israel
            </p>
            <p className="text-lg text-gray-600">
              Creating smart and intuitive mobile applications that make everyday life easier
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-left">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">My Story</h2>
            </div>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Between 2012 and 2016, I developed mobile applications as part of the <strong className="text-blue-600">dreamBit</strong> team. 
                During those years, I had the opportunity to work on various projects, learning the ins and outs of mobile development 
                and creating apps that users loved.
              </p>
              <p>
                After a long break from active development, I've returned to pursue my passion - mobile app development. 
                This time, I'm building apps as a hobby, driven by my love for technology and creativity.
              </p>
              <p>
                Today, I focus on developing smart and intuitive mobile applications that can help people in their daily lives. 
                Each app I create is crafted with attention to detail, user experience, and innovative solutions to real-world problems.
              </p>
            </div>
          </div>

          {/* Zuli Monsters Section */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Zuli Monsters</h2>
            <p className="text-lg text-gray-700 mb-4">
              One of the unique aspects of my apps are the original illustrations I create, which I call <strong className="text-purple-600">Zuli Monsters</strong>.
            </p>
            <p className="text-gray-600 italic">
              These cute and colorful creatures accompany users throughout their app experience, adding a touch of fun and personality to every interaction. 
              You'll be hearing more about them soon!
            </p>
          </div>

          {/* ZuList App Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">ZuList</h2>
            <p className="text-xl text-gray-700 mb-4">
              My first app - Smart shopping list management
            </p>
            <p className="text-lg text-gray-600 mb-8">
              ZuList is a Flutter-based shopping list application designed to make grocery shopping easier and more collaborative. 
              With real-time sharing, offline support, and smart product recommendations, it's the perfect companion for families and friends who shop together. 
              Coming soon!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">Real-time Sharing</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                <Wifi className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">Works Offline</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">Smart Recommendations</p>
              </div>
            </div>

            <Link
              href="/zulist"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Learn more about ZuList →
            </Link>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-6">
              Have a question, an idea, or just want to connect? I'd love to hear from you!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:zuki.apps.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              zuki.apps.dev@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">© 2025 Zuki Apps - All rights reserved</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Developed in Israel • As a hobby • With passion
          </p>
        </div>
      </footer>
    </div>
  );
}
