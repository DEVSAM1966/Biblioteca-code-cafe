import { PublisherOutDTO } from "../dtos/out/publisher.dto";
import { NotFoundError } from "../models/errors/not-found.error";
import { PublishersRepository } from "../repositories/publishers.repository";

export class PublishersService {
  static async getById(id: number): Promise<PublisherOutDTO> {
    const publisher = await PublishersRepository.getById(id);

    if (!publisher) {
      throw new NotFoundError(`Publisher with id ${id} not found`);
    }

    const dto: PublisherOutDTO = {
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
