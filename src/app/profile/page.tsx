'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

  const firestore = useFirestore();
  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  
  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const getInitials = (firstName?: string, lastName?: string) => {
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  if (isUserLoading || isUserDataLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photoURL ?? ''} />
              <AvatarFallback className="text-3xl">
                {getInitials(userData.firstName, userData.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">
                {userData.firstName} {userData.lastName}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h3 className="font-semibold">User ID</h3>
              <p className="text-sm text-muted-foreground">{user.uid}</p>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Email Verified</h3>
              <p className="text-sm text-muted-foreground">
                {user.emailVerified ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Account Created</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(user.metadata.creationTime!).toLocaleDateString()}
              </p>
            </div>
             <div className="grid gap-1">
              <h3 className="font-semibold">Last Sign In</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(user.metadata.lastSignInTime!).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
