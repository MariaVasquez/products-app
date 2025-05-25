import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ImageStorageService } from '../../domain/services/image-storage.service';
import { InfrastructureException } from 'src/shared/exceptions/infrastructure-exception';
import { ResponseCodes } from 'src/shared/response-code';

@Injectable()
export class S3ImageStorageService implements ImageStorageService {
  private readonly client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  private readonly bucket = process.env.AWS_S3_BUCKET_NAME!;

  async uploadImage(
    key: string,
    file: Buffer,
    mimeType: string,
  ): Promise<string> {
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: mimeType,
        }),
      );
      return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
      throw new InfrastructureException(
        ResponseCodes.UPLOAD_S3_ERROR.message,
        error,
      );
    }
  }

  async deleteImage(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch (error) {
      throw new InfrastructureException(
        ResponseCodes.DELETE_S3_ERROR.message,
        error,
      );
    }
  }
}
