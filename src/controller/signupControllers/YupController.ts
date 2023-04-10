import * as Yup from 'yup'
import { subYears } from 'date-fns';
import {cpf} from 'cpf-cnpj-validator'
import { userData } from '../../models/signupForm';

const requiredMessage = "Campo obrigatório"
const maxDate = subYears(new Date(), 18);
const minDate = subYears(new Date(), 100);

export const userDataSchema = (formData: userData) => {
    
    return Yup.object({
    userName: Yup
      .string()
      .required(requiredMessage)
      .min(3, 'Insira um nome válido')
      .test('has-invalid-character', 'Não utilize caracteres especiais', (value: string) => /^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$/.test(value))
      .default(formData.userName),
    email: Yup
    .string()
      .email('Digite um email válido')
      .required(requiredMessage)
      .default(formData.email),
    cpf: Yup
      .string()
      .required(requiredMessage)
      .test('cpf-valido', 'CPF inválido', (value: any) => cpf.isValid(value))
      .default(formData.cpf),
    cellphone: Yup
      .string()
      .required(requiredMessage)
      .min(16, 'Digite um telefone válido')
      .default(formData.cellphone),
    birthday: Yup
      .date()
      .required()
      .nullable()
      .transform((dateValue: Date) => dateValue instanceof Date ? dateValue : null)
      .min(minDate, 'Insira uma data válida')
      .max(maxDate, 'Você precisa ter pelo menos 18 anos.')
      .typeError('Insira uma data válida'),
      termsAndServices: Yup.boolean()
      .oneOf([true], 'Você precisa ler e aceitar os termos de serviços.')
      .default(formData.birthday)
  })
}