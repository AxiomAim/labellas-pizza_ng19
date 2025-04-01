import { Injectable } from '@angular/core';
import { catchError, forkJoin, from, map, Observable, Observer, of, switchMap, throwError } from 'rxjs';
import { 
    Firestore, 
    collection, 
    query, 
    where, 
    deleteDoc, 
    addDoc,
    updateDoc,
    collectionData,
    getDoc,
    doc,
    setDoc,
    WhereFilterOp,
 } from '@angular/fire/firestore';
import { BaseDatabaseModel } from '../models/base-dto.model';
import { getDocs, writeBatch } from 'firebase/firestore';


@Injectable(
    {
        providedIn: 'root',
    }
)
export class FirestoreService {
    constructor(
        public firestore: Firestore
    ) {}

    public getAll<T extends BaseDatabaseModel>(collectionPath: string): Observable<T[]> {
      const colRef = collection(this.firestore, collectionPath);
    
      // Add a where clause to filter out documents where the 'id' field is not set
      const q = query(colRef, where('id', '!=', null)); 
    
      const converter = {
        toFirestore: (data: T) => data,
        fromFirestore: (snap: any) => snap.data() as T
      };
      const qWithConverter = q.withConverter(converter);
      return collectionData<T>(qWithConverter);
    }
      
    //   public getItem<T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> {
    //     debugger
    //     const converter = {
    //       toFirestore: (data: T) => data,
    //       fromFirestore: (snap: any) => snap.data() as T
    //     };
    //     const docRef = doc(this.firestore, `${collectionPath}/${id}`).withConverter(converter);        
    //     return new Observable<T>(subscriber => {
    //       getDoc(docRef).then(documentSnapshot => {
    //         if (documentSnapshot.exists()) {
    //           subscriber.next(documentSnapshot.data() as T);
    //           subscriber.complete();
    //         } else {
    //           subscriber.error(`Document with ID ${id} not found`);
    //         }
    //       })
    //       .catch(error => subscriber.error(error));
    //     });
    // }

    public getItem<T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> {
      const docRef = doc(this.firestore, `${collectionPath}/${id}`);        
      return new Observable<T>(subscriber => {
        getDoc(docRef).then(documentSnapshot => {
          if (documentSnapshot.exists()) {
            subscriber.next(documentSnapshot.data() as T);
            subscriber.complete();
          } else {
            subscriber.error("Document not found");
          }
        })
        .catch(error => subscriber.error(error));
      });
  }

  public getQuery<T extends BaseDatabaseModel>(collectionPath: string, fieldName: string, operator: WhereFilterOp, value: string): Observable<T[]> {
      const colRef = collection(this.firestore, collectionPath); // Create CollectionReference
      const q = query(
          colRef, 
          where(fieldName, operator, value),
          where(fieldName, operator, value),
      );
  
      const converter = {
        toFirestore: (data: T) => data,
        fromFirestore: (snap: any) => snap.data() as T
      };
      const qWithConverter = query(colRef, where(fieldName, operator, value)).withConverter(converter);
      return collectionData<T>(qWithConverter).pipe( // Pass the Query object to collectionData
          catchError(error => {
              console.error('Error fetching data:', error);
              return of([]); 
          })
      );
  }
  
  public getQueryWhereclause<T extends BaseDatabaseModel>(collectionPath: string, queries: FirestoreQuery[]): Observable<T[]> {
    const colRef = collection(this.firestore, collectionPath); // Create CollectionReference
    const whereclause: any[] = [];
    queries.forEach(query => {
      const w = where(query.field, query.operation, query.searchKey)
      whereclause.push(w);
    });
    const q = query(
        colRef, 
        ...whereclause
    );
    const converter = {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: any) => snap.data() as T
    };
    const qWithConverter = q.withConverter(converter);
    return collectionData<T>(qWithConverter).pipe( // Pass the Query object to collectionData
        catchError(error => {
            console.error('Error fetching data:', error);
            return of([]); 
        })
    );
}

public getCompoundQuery<T extends BaseDatabaseModel>(collectionPath: string, queryString: FirestoreQuery[]): Observable<T[]> {
    const colRef = collection(this.firestore, collectionPath); 
    
    // Build the query dynamically
    let q = query(colRef);
    for (let qItem of queryString) {
      q = query(q, where(qItem.field, qItem.operation, qItem.searchKey));
    }
  
    const converter = {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: any) => snap.data() as T
    };
    const qWithConverter = q.withConverter(converter);
    return collectionData<T>(qWithConverter).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of([]);
      })
    );
  }

public deleteDuplicates<T extends BaseDatabaseModel>(collectionPath: string): Observable<any> {
      const q = query(
        collection(this.firestore, collectionPath),
        where('id', '==', '') 
      );
    
      return from(getDocs(q)).pipe(
        switchMap((querySnapshot) => {
          if (querySnapshot.size === 0) {
            return of(undefined); // No matching documents
          }
    
          const batchSize = 250; // Set your desired batch size
          const batches: Observable<void>[] = []; 
    
          // Create batches of 250 delete operations
          for (let i = 0; i < querySnapshot.docs.length; i += batchSize) {
            const batch = writeBatch(this.firestore);
            const batchDocs = querySnapshot.docs.slice(i, i + batchSize);
            batchDocs.forEach((doc) => batch.delete(doc.ref));
            batches.push(from(batch.commit()));
          }
    
          // Execute all batches in parallel (optional)
          return forkJoin(batches); 
        })
      );
    }

    public createItem<T extends BaseDatabaseModel>(collectionPath: string, data: T): Observable<T> {
      let docRef;
      if (data.id) {
        // Use the provided id
        docRef = doc(this.firestore, collectionPath, data.id);
      } else {
        // Generate a new unique ID
        docRef = doc(collection(this.firestore, collectionPath)); 
      }
    
      // Convert the Promise returned by setDoc to an Observable
      return from(setDoc(docRef, data)).pipe(
        // Map the DocumentReference to the original data with the id
        map(() => ({ ...data, id: docRef.id } as T))
      );
    }

    updateItem<T>(collectionPath: string, id: string, data: Partial<T>): Observable<T> {
      const docRef = doc(this.firestore, collectionPath, id); 
      // 1. Get the existing document
      return from(getDoc(docRef)).pipe(
        switchMap((docSnap) => {
          if (docSnap.exists()) {
            // 2. Update with new data (spread for immutability)
            const updatedData = { ...docSnap.data(), ...data } as any;
            return from(updateDoc(docRef, updatedData)).pipe(
              map(() => updatedData) 
            );
          } else {
            // Handle the case where the document doesn't exist
            // You can throw an error or return an observable with a default value
            throw new Error(`Document with ID ${id} not found`); 
          }
        })
      );
    }

    public deleteItem<T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> {
      const docRef = doc(this.firestore, collectionPath, id);
    
      // 1. Fetch the document before deleting
      return from(getDoc(docRef)).pipe(
        switchMap((docSnap) => {
          if (docSnap.exists()) {
            // 2. Delete the document if it exists
            return from(deleteDoc(docRef)).pipe(
              map(() => docSnap.data() as T) // Return the deleted document data
            );
          } else {
            // Handle the case where the document doesn't exist
            return of(null); // Or throw an error 
          }
        })
      );
    }

    // exportJson(documents: any) {
      
    //   const jsonData = JSON.stringify(documents, null, 2); // Beautify JSON (optional)
    //   const blob = new Blob([jsonData], { type: 'application/json' });
    
    //   const link = document.createElement('a');
    //       link.href = window.URL.createObjectURL(blob);
    //       link.download = `${collectionName}.json`; // Set the filename
    //       link.style.display = 'none'; // Hide the link
    
    // }
    
    public exportJson<T extends BaseDatabaseModel>(collectionPath: string): Observable<T[]> {
      const colRef = collection(this.firestore, collectionPath);
    
      // Add a where clause to filter out documents where the 'id' field is not set
      const q = query(colRef, where('id', '!=', null)); 
    
      const converter = {
        toFirestore: (data: T) => data,
        fromFirestore: (snap: any) => snap.data() as T
      };
      const qWithConverter = q.withConverter(converter);

      const jsonData = JSON.stringify(qWithConverter, null, 2); // Beautify JSON (optional)
      const blob = new Blob([jsonData], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${collectionPath}.json`; // Set the filename
      link.style.display = 'none'; // Hide the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
      window.URL.revokeObjectURL(link.href); // Release the Blob URL

      return collectionData<T>(qWithConverter);
    }

    // public bulkCreate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
    //   const batch = writeBatch(this.firestore);
    //   const savedData: T[] = []; 

    //   data.forEach(item => {
    //     let docRef;
    //     if (item.id) {
    //       docRef = doc(this.firestore, collectionPath, item.id);
    //     } else {
    //       docRef = doc(collection(this.firestore, collectionPath));
    //     }
    //     batch.set(docRef, item);
    //     savedData.push({ ...item, id: docRef.id } as T);
    //   });

    //   return from(batch.commit()).pipe(
    //     map(() => savedData)
    //   );
    // }

    public bulkCreate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
      const batchSize = 499; // Firestore limit for batch writes
      const batches: Observable<T[]>[] = []; 
      const savedData: T[] = []; 

      for (let i = 0; i < data.length; i += batchSize) {
        const batch = writeBatch(this.firestore);
        const batchData = data.slice(i, i + batchSize);

        batchData.forEach(item => {
          let docRef;
          if (item.id) {
            docRef = doc(this.firestore, collectionPath, item.id);
          } else {
            docRef = doc(collection(this.firestore, collectionPath));
          }
          batch.set(docRef, item);
          savedData.push({ ...item, id: docRef.id } as T);
        });

        batches.push(
          from(batch.commit()).pipe(
            map(() => batchData) // Return the data for this batch
          )
        );
      }

      // Execute all batches and combine the results
      return forkJoin(batches).pipe(
        map((results) => results.flat()) // Flatten the array of arrays
      );
    }

    public bulkUpdate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
      const batchSize = 499; 
      const batches: Observable<T[]>[] = [];
      const updatedData: T[] = []; 
      const firestore = this.firestore; // Get Firestore instance
    
      for (let i = 0; i < data.length; i += batchSize) {
        const batch = writeBatch(firestore);
        const batchData = data.slice(i, i + batchSize);
    
        batchData.forEach(item => {
          if (!item.id) {
            throw new Error("ID is required for bulkUpdate"); 
          }
          const docRef = doc(firestore, collectionPath, item.id);
          batch.update(docRef, { ...item } as any); // Use update instead of set
          updatedData.push({ ...item } as T); 
        });
    
        batches.push(
          from(batch.commit()).pipe(
            map(() => batchData)
          )
        );
      }
    
      return forkJoin(batches).pipe(
        map((results) => results.flat())
      );
    }

    // public bulkUpdate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
    //   const batchSize = 499;
    //   const batches: Observable<T[]>[] = [];
    //   const updatedData: T[] = [];
    //   const firestore = this.firestore; // Get Firestore instance
    
    //   for (let i = 0; i < data.length; i += batchSize) {
    //     const batch = writeBatch(firestore);
    //     const batchData = data.slice(i, i + batchSize);
    
    //     batchData.forEach(item => {
    //       try {
    //         if (!item.id) {
    //           throw new Error("ID is required for bulkUpdate");
    //         }
    
    //         const docRef = doc(firestore, collectionPath, item.id);
    //         batch.update(docRef, { ...item } as any); // Use update instead of set
    //         updatedData.push({ ...item } as T);
    //       } catch (error) {
    //         console.error(`Error updating item with ID ${item.id}:`, error);
    //         // You can optionally log the error to a remote service or notify the user
    //       }
    //     });
    
    //     batches.push(
    //       from(batch.commit()).pipe(
    //         map(() => batchData)
    //       )
    //     );
    //   }
    
    //   return forkJoin(batches).pipe(
    //     map((results) => results.flat()),
    //     catchError((error) => {
    //       console.error('Error during bulk update:', error);
    //       // You can optionally throw a custom error or return an empty array
    //       return of([]);
    //     })
    //   );
    // }
    
    public bulkDelete(collectionPath: string, ids: string[]): Observable<void> {
      const batchSize = 499; // Firestore limit for batch writes
      const batches: Observable<void>[] = [];
    
      for (let i = 0; i < ids.length; i += batchSize) {
        const batch = writeBatch(this.firestore);
        const batchIds = ids.slice(i, i + batchSize);
    
        batchIds.forEach(id => {
          const docRef = doc(this.firestore, collectionPath, id);
          batch.delete(docRef);
        });
    
        batches.push(
          from(batch.commit())
        );
      }
    
      // Execute all batches
      return forkJoin(batches).pipe(map(() => void 0)); 
    }

    bulkDeleteAll(collectionPath: string): Observable<void> {
      const db = this.firestore;
      const collectionRef = collection(db, collectionPath);
      const batchSize = 499; // Firestore limit for batch writes
      const batches: Observable<void>[] = [];
  
      return from(getDocs(collectionRef)).pipe( // Use from() to convert promise to Observable
        map((querySnapshot) => {
          const ids: string[] = [];
          querySnapshot.forEach((doc) => {
            ids.push(doc.id); // Collect document IDs
          });
          return ids;
        }),
        map((ids) => { // Now we have the IDs
          for (let i = 0; i < ids.length; i += batchSize) {
            const batch = writeBatch(db);
            const batchIds = ids.slice(i, i + batchSize);
  
            batchIds.forEach(id => {
              const docRef = doc(db, collectionPath, id);
              batch.delete(docRef);
            });
  
            batches.push(from(batch.commit()));
          }
          return batches;
        }),
        map(batches => forkJoin(batches)), // ForkJoin the batches
        map(() => void 0) // Return void after successful deletion
      );
    }

}

export class FirestoreQuery {
  field: string;
  operation: WhereFilterOp;
  searchKey: any;
}