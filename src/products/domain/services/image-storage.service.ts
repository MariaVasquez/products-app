export interface ImageStorageService {
  uploadImage(key: string, file: Buffer, mimeType: string): Promise<string>;
  deleteImage(key: string): Promise<void>;
}
