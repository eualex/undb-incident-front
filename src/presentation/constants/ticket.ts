const RegisterTicketSteps = {
  ON_BOARDING: 1,
  PERSONAL_INFO: 2,
  QUESTIONS: 3,
  FINAL_CONSIDERATIONS: 4,
};

enum StepTypeEnum {
  NEXT = 'next',
  BACK = 'back',
}

const TICKET_STEP_QUERY_KEY = 'step';

export { RegisterTicketSteps, StepTypeEnum, TICKET_STEP_QUERY_KEY };
