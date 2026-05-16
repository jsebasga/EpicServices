import {
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
    type User
  } from 'firebase/auth';
  import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc
  } from 'firebase/firestore';
  import { auth, db, googleProvider } from '@/lib/firebase/client';
  import type { UserProfile } from '@/lib/auth/authTypes';
  
  type RegisterInput = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'client' | 'technician';
  };
  
  export async function registerUser(input: RegisterInput) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
  
    await updateProfile(credential.user, {
      displayName: input.name
    });
  
    const profile: UserProfile = {
      uid: credential.user.uid,
      name: input.name,
      email: input.email,
      phone: input.phone,
      role: input.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  
    await setDoc(doc(db, 'users', credential.user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  
    return credential.user;
  }
  
  export async function loginWithEmail(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  }
  
  export async function loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);
    const user = credential.user;
  
    const profileRef = doc(db, 'users', user.uid);
    const profileSnap = await getDoc(profileRef);
  
    if (!profileSnap.exists()) {
      await setDoc(profileRef, {
        uid: user.uid,
        name: user.displayName ?? 'Usuario',
        email: user.email ?? '',
        phone: user.phoneNumber ?? '',
        role: 'client',
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  
    return user;
  }
  
  export async function logout() {
    await signOut(auth);
  }
  
  export async function recoverPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }
  
  export async function changePassword(
    user: User,
    currentPassword: string,
    newPassword: string
  ) {
    if (!user.email) {
      throw new Error('El usuario no tiene correo asociado.');
    }
  
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
  
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }
  
  export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const profileSnap = await getDoc(doc(db, 'users', uid));
  
    if (!profileSnap.exists()) {
      return null;
    }
  
    const data = profileSnap.data() as UserProfile;
  
    return {
      ...data,
      uid: data.uid || profileSnap.id
    };
  }