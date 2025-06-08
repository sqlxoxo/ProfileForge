import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit3, Share2, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background rounded-lg shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">
            Welcome to <span className="text-accent">ProfileForge</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Craft your professional digital identity with ease. Build stunning, shareable profiles that make an impact.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-4xl font-headline text-center mb-12">Why Choose ProfileForge?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Edit3 className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="font-headline text-center text-2xl">Create & Customize</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Easily build detailed profiles with your work experience, education, skills, and more. Tailor it to reflect your unique brand.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <UserCheck className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="font-headline text-center text-2xl">Professionally Designed</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Present your information in a sleek, modern, and readable format that impresses recruiters and contacts.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                 <Share2 className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="font-headline text-center text-2xl">Share & Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Your ProfileForge link is your new digital business card. Share it effortlessly across platforms. (Sharing feature coming soon!)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-16">
        <Image 
          src="https://placehold.co/800x400.png" 
          alt="ProfileForge example" 
          width={800} 
          height={400}
          className="rounded-lg shadow-xl mx-auto"
          data-ai-hint="profile interface" 
        />
      </section>
    </div>
  );
}
