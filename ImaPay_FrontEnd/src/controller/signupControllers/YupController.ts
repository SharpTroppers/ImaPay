import * as Yup from "yup";
import { subYears } from "date-fns";
import { cpf } from "cpf-cnpj-validator";
import { userData } from "../../models/signupForm";

const requiredMessage = "Campo obrigatório";
const maxDate = subYears(new Date(), 18);
const minDate = subYears(new Date(), 100);

export const userDataSchema = (formData: userData) => {
  return Yup.object({
    userName: Yup.string()
      .required(requiredMessage)
      .min(3, "Insira um nome válido")
      .test(
        "has-invalid-character",
        "Não utilize caracteres especiais",
        (value: string) => /^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$/.test(value)
      )
      .default(formData.userName),
    email: Yup.string()
      .email("Digite um email válido")
      .required(requiredMessage)
      .default(formData.email),
    cpf: Yup.string()
      .required(requiredMessage)
      .min(11, "Digite um cpf válido")
      // .test("cpf-valido", "CPF inválido", (value: any) => cpf.isValid(value))
      .default(formData.cpf),
    phoneNumber: Yup.string()
      .required(requiredMessage)
      .min(16, "Digite um telefone válido")
      .default(formData.phoneNumber),
    birthday: Yup.date()
      .required()
      .nullable()
      .transform((dateValue: Date) =>
        dateValue instanceof Date ? dateValue : null
      )
      .min(minDate, "Insira uma data válida")
      .max(maxDate, "Você precisa ter pelo menos 18 anos.")
      .typeError("Insira uma data válida"),
    termsAndServices: Yup.boolean()
      .oneOf([true], "Você precisa ler e aceitar os termos de serviços.")
      .default(formData.birthday),
  });
};

export const addressDataSchema = (formData: userData) => {
  return Yup.object({
    postalCode: Yup.string()
      .required(requiredMessage)
      .default(formData.postalCode),
    baseAddress: Yup.string()
      .required(requiredMessage)
      .default(formData.baseAddress),
    baseAddressNumber: Yup.string()
      .required(requiredMessage)
      .default(formData.baseAddressNumber),
    neighborhood: Yup.string()
      .required(requiredMessage)
      .default(formData.neighborhood),
    cityName: Yup.string().required(requiredMessage).default(formData.cityName),
    stateName: Yup.string()
      .required(requiredMessage)
      .default(formData.stateName),
  });
};

export const accountDataSchema = () => {
  return Yup.object({
    accountName: Yup.string().min(3, "Digite um usuário válido"),
    password: Yup.string()
      .required("Digite uma senha")
      .min(8, "A senha precisa ter pelo menos 8 caracteres"),
    passwordConfirmation: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "A senha e confirmação precisam ser identicas"
      )
      .required("Repita a senha digitada acima"),
  });
};

export default { userDataSchema, addressDataSchema, accountDataSchema };
