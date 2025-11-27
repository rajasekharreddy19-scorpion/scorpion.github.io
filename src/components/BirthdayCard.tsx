
'use client';

import {useState, useRef} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Heart, Sparkles, Star, Upload} from 'lucide-react';
import Confetti from './Confetti';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import {ComplimentGenerator} from './ComplimentGenerator';
import { Input } from '@/components/ui/input';

export function BirthdayCard() {
  const [isOpen, setIsOpen] = useState(false);
  const girlfriendPhotoDefault = PlaceHolderImages.find(
    img => img.id === 'girlfriend-photo'
  );
  const [girlfriendPhotoUrl, setGirlfriendPhotoUrl] = useState(girlfriendPhotoDefault?.imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGirlfriendPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  if (!isOpen) {
    return (
      <Card className="w-full max-w-md transform animate-fade-in p-8 text-center shadow-2xl transition-all duration-500 hover:scale-105 bg-card rounded-2xl">
        <CardHeader>
          <div className="mb-4 flex items-center justify-center">
            <Heart className="h-16 w-16 animate-pulse text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-foreground">
            A Special Message For You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 font-body text-muted-foreground">
            Happy Birthday, my love!
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="transform shadow-lg transition-transform hover:-translate-y-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Open Me
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Confetti />
      <div className="w-full max-w-4xl animate-fade-in">
        <Card className="p-4 shadow-2xl md:p-8 bg-card rounded-2xl">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-6 text-center">
              {girlfriendPhotoUrl && (
                <div className="group relative aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={girlfriendPhotoUrl}
                    alt={girlfriendPhotoDefault?.description || 'Birthday photo'}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transform transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={girlfriendPhotoDefault?.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="font-headline text-4xl">Happy Birthday!</h2>
                  </div>
                </div>
              )}
               <div className='flex gap-2'>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Update Photo
                </Button>
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
                />
              </div>
              <div className="flex gap-2 text-accent">
                <Star /> <Star /> <Star /> <Star /> <Star />
              </div>
              <p className="font-body text-muted-foreground">
                To the one who makes my world brighter.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4 rounded-r-lg border-l-4 border-primary p-6 font-body text-lg text-foreground shadow-inner bg-secondary/30">
                <p className="font-headline text-2xl text-primary-foreground">
                  My Dearest Love,
                </p>
                <p>
                  On your special day, I wanted to remind you of just how much
                  you mean to me. Every moment with you is a gift, and my heart
                  is filled with so much love and gratitude for having you in my
                  life.
                </p>
                <p>
                  You are my sunshine on a cloudy day, my comfort, and my
                  greatest adventure. Wishing you a day as beautiful as you are.
                </p>
                <p className="text-right">With all my love,</p>
                <p className="text-right font-headline text-xl">Your Name</p>
              </div>
              <ComplimentGenerator />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
