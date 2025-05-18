export type CardFormField = 'cardNumber' | 'expiryDate' | 'cvv' | 'cardholderName'

export type FieldState = {
  value: string
  valid: boolean | null
}

type Action =
  | { type: 'SET_FIELD'; field: CardFormField; value: string }
  | { type: 'VALIDATE_FIELD'; field: CardFormField; isValid: boolean }
  | { type: 'SET_ALL_FIELDS'; payload: Record<CardFormField, FieldState> }

export function cardFormReducer(
  state: Record<CardFormField, FieldState>,
  action: Action
): Record<CardFormField, FieldState> {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: { value: action.value, valid: null },
      }
    case 'VALIDATE_FIELD':
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          valid: action.isValid,
        },
      }
    case 'SET_ALL_FIELDS':
      return action.payload
    default:
      return state
  }
}
