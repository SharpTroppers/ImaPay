export interface signupFormStepHandler {
  stepForward: () => void
  stepBackward?: () => void
}
export interface userData {
  userName: string;
  email: string;
  cpf: string;
  cellphone: string;
  birthday: any;
  postalCode: string;
  baseAddress: string;
  baseAddressNumber: string;
  neighborhood: string;
  cityName: string;
  stateName: string;
  accountName:  string;
  password: string;
  setFormData: () => void
}

export interface stepProps extends userData, signupFormStepHandler {}

export interface termsAndServicesModel {
  agreeToTermsAndService: () => void, 
  toogleModal: (booleanValue: boolean) => void
}