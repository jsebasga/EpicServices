import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { UserProfile } from '@/lib/auth/authTypes';

export async function getTechnicians(): Promise<UserProfile[]> {
  const techniciansQuery = query(
    collection(db, 'users'),
    where('role', '==', 'technician'),
    where('status', '==', 'active')
  );

  const snapshot = await getDocs(techniciansQuery);

  return snapshot.docs.map((technicianDoc) => {
    const data = technicianDoc.data() as UserProfile;

    return {
      ...data,
      uid: data.uid || technicianDoc.id
    };
  });
}

export async function getActiveUsersCount() {
  const usersQuery = query(
    collection(db, 'users'),
    where('status', '==', 'active')
  );

  const snapshot = await getDocs(usersQuery);

  return snapshot.size;
}

export async function getActiveClientsCount() {
  const clientsQuery = query(
    collection(db, 'users'),
    where('role', '==', 'client'),
    where('status', '==', 'active')
  );

  const snapshot = await getDocs(clientsQuery);

  return snapshot.size;
}

export async function getActiveTechniciansCount() {
  const techniciansQuery = query(
    collection(db, 'users'),
    where('role', '==', 'technician'),
    where('status', '==', 'active')
  );

  const snapshot = await getDocs(techniciansQuery);

  return snapshot.size;
}