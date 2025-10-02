import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepository: DonationsRepository) {}

  async create(createDonationDto: CreateDonationDto) {
    const donationData = {
      ...createDonationDto,
    };

    const donation = await this.donationsRepository.create(donationData);
    return {
      message: 'Doação cadastrada com sucesso',
      donation,
    };
  }

  async findAll() {
    return await this.donationsRepository.findAll();
  }

  async findAllByUserId(userId: string) {
    const donation = await this.donationsRepository.findByUserId(userId);

    if (!donation) throw new NotFoundException('Doação não encontrada');
    return donation;
  }

  async findOne(id: string) {
    const donation = await this.donationsRepository.findById(id);
    return donation;
  }

  async update(id: string, updateDonationDto: UpdateDonationDto) {
    const donation = await this.donationsRepository.findById(id);
    if (!donation) throw new NotFoundException('Doação não encontrada');

    const updatedDonation = await this.donationsRepository.update(id, updateDonationDto);
    return {
      message: 'Doação atualizada com sucesso',
      donation: updatedDonation,
    };
  }

  async remove(id: string) {
    const donation = await this.donationsRepository.findById(id);
    if (!donation) throw new NotFoundException('Doação não encontrada');

    await this.donationsRepository.delete(id);
    return {
      message: 'Doação deletada com sucesso',
    };
  }
}
