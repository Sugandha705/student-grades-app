// ✅ TypeScript Konzept: type Definition
// ✅ Konzept: string und number als primitive Typen
// ✅ Konzept: Optionaler Parameter mit ?
export type Student = {
 _id?: string; // Optional, kommt von MongoDB
 name: string;
 grade: number;
 createdAt?: string; // Optional, Timestamp von MongoDB
 updatedAt?: string; // Optional, Timestamp von MongoDB
};
// ✅ Konzept: Union Types
// Status kann nur einen dieser drei Werte haben
export type LoadingStatus = 'idle' | 'loading' | 'error';