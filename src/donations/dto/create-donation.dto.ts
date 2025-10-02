import { IsNotEmpty, IsNumber, IsEnum, IsUUID} from 'class-validator';
import { PaymentMethods } from '../types/donation.types';
import { Status } from '../types/donation.types';

export class CreateDonationDto {
    @IsNotEmpty({ message: "O usuário da postagem não pode ser vazio" })
    @IsUUID()
    userId: string;

    @IsNotEmpty({ message: 'O campo valor não pode ser vazio.' })
    @IsNumber({}, { message: 'O campo valor deve ser um número.' })
    amount: number;

    @IsNotEmpty({ message: 'O campo método de pagamento não pode ser vazio.' })
    @IsEnum(PaymentMethods, { message: 'O campo método de pagamento deve ser um dos seguintes valores: Cartão de Crédio, Cartão de Débito ou PIX.' })
    paymentMethod: PaymentMethods;

    @IsNotEmpty({ message: 'O campo status não pode ser vazio.' })
    @IsEnum(Status, { message: 'O campo status deve ser um dos seguintes valores: Aprovado, Negado ou Em Processamento.' })
    status: Status;
}
