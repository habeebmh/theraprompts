import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export async function signIn (email, password) {
  const auth = getAuth()
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function signUpUser (email, password, firstName) {
  const auth = getAuth()
  await signOut(auth)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: firstName
  })
  return user
}
