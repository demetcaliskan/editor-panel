import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { db } from './firebaseConfig'

export const loginUser = async (email, password) => {
  const authentication = getAuth()
  const response = await signInWithEmailAndPassword(
    authentication,
    email,
    password
  )
  return response
}

export const getUserFromEmail = async (email) => {
  const queryData = query(collection(db, 'users'), where('email', '==', email))
  const data = await getDocs(queryData)
  const users = data?.docs?.map((doc) => ({
    ...doc?.data(),
    id: doc?.id,
  }))
  return users[0]
}

export const getDocumentsInCollection = async (collectionName) => {
  const dataCollectionReference = collection(db, collectionName)
  const data = await getDocs(dataCollectionReference)
  return data?.docs?.map((doc) => ({
    ...doc?.data(),
    id: doc?.id,
  }))
}

export const getOwnerDocumentsInCollection = async (
  collectionName,
  ownerId
) => {
  const queryData = query(
    collection(db, collectionName),
    where('ownerId', '==', ownerId)
  )
  const data = await getDocs(queryData)
  return data?.docs?.map((doc) => ({
    ...doc?.data(),
    id: doc?.id,
  }))
}

export const addDocumentToCollection = async (
  newDoc,
  newDocId,
  collectionName
) => {
  await setDoc(doc(db, collectionName, newDocId), newDoc)
}

export const updateDocumentInCollection = async (
  id,
  collectionName,
  newField
) => {
  const targetDoc = doc(db, collectionName, id)
  await updateDoc(targetDoc, newField)
}

export const deleteDocumentInCollection = async (id, collectionName) => {
  const targetDoc = doc(db, collectionName, id)
  await deleteDoc(targetDoc)
}
