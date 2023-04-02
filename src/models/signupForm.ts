export interface signupFormStepHandler {
    stepForward: () => void
    stepBackward?: () => void
  }