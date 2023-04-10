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
}

export interface termsAndServicesModel {
  agreeToTermsAndService: () => void, 
  toogleModal: (booleanValue: boolean) => void
}