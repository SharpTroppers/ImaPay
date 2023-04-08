interface signupData {
  name:string,
  email: string,
  cpf: string,
  cellphone: string,
  birthday: string,
  address: string,
  number: string,
  neighborhood: string,
  city: string,
  country: string
}
export interface signupFormStepHandler {
  stepForward: (event: React.ChangeEvent<HTMLInputElement>) => void
  stepBackward?: (event: React.ChangeEvent<HTMLInputElement>) => void
  signupData: signupData
}
interface userData {
  formData: signupData;
  setFormData: () => void
}

export interface termsAndServicesModel {
  agreeToTermsAndService: () => void, 
  hideModal: () => void
}