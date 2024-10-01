import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export async function signIn (email, password) {
  const auth = getAuth()
  const user = await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password)
  return user.user
}

export async function signUpUser (email, password, firstName) {
  const auth = getAuth()
  const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase().trim(), password)
  const user = userCredential.user
  await updateProfile(user, {
    displayName: firstName
  })
  return user.user
}
