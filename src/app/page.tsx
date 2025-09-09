import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle2, Lightbulb, Bell, BarChart2 } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'AI Recommendations',
      description: 'Get personalized crop suggestions based on your farm\'s data and local conditions.',
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: 'Real-time Alerts',
      description: 'Receive timely notifications for weather changes, pest threats, and farming tasks.',
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: 'Data-driven Insights',
      description: 'Analyze soil health, weather patterns, and historical data to make informed decisions.',
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: 'Feedback Loop',
      description: 'Help improve our AI by providing feedback on your crop outcomes.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-green-300 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-gray-900 dark:text-white">
                AI-Powered Smart Crop Advisory for Modern Farmers
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                CropWise leverages artificial intelligence to provide you with actionable insights, helping you increase yield, reduce risk, and grow smarter.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-16">
              <Image
                src="https://picsum.photos/1200/600"
                alt="Lush green farm field"
                data-ai-hint="farm field"
                width={1200}
                height={600}
                className="rounded-xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Features to Help You Thrive</h2>
              <p className="mt-4 text-lg text-gray-600">Everything you need for a successful harvest.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/50">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">&copy; {new Date().getFullYear()} CropWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
