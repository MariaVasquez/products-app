export interface AddressRepository {
  countByUserId(userId: number): Promise<number>;
}
