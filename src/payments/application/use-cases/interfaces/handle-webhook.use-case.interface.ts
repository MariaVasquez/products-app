import { WompiWebhookDto } from 'src/payments/controllers/dto/webhook/wompi.webhook.dto';

export interface HandleWompiWebhookUseCase {
  execute(payload: WompiWebhookDto): Promise<void>;
}
