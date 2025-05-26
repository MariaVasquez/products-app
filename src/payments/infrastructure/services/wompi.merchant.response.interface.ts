export interface WompiMerchantResponse {
  data: {
    presigned_acceptance: {
      acceptance_token: string;
    };
  };
}
