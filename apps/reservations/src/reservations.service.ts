import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsClient: ClientProxy,
  ) {}

  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsClient
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (response) => {
          return await this.reservationsRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            invoiceId: response.id,
            userId,
          });
        }),
      );
  }

  findAll() {
    return this.reservationsRepository.findMany({});
  }

  findOne(id: string) {
    return this.reservationsRepository.findOne({
      _id: id,
    });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({
      _id: id,
    });
  }
}
