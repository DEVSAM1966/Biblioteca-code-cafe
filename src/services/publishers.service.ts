import { Publisher } from "@prisma/client";
import { PublishersRepository } from "../repositories/publishers.repository";
import { PublishersOutDTO } from "../dtos/out/publishers.dto";


export class PublishersService {
  static async getById(id: number): Promise<PublishersOutDTO | null> {
    const publisher = await PublishersRepository.getById(id);

    if (!publisher) return null;

    const dto: PublishersOutDTO = {
      publisher_id: publisher.publisher_id,
      name_publisher: publisher.name_publisher,
      address: publisher.address ?? undefined,
      city: publisher.city ?? undefined,
      province: publisher.province ?? undefined,
      postal_code: publisher.postal_code ?? undefined,
      country: publisher.country ?? undefined,
      phone: publisher.phone ?? undefined,
      notes: publisher.notes ?? undefined,
    };

    return dto;
  }
}
