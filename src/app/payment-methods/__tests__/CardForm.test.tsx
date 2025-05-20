import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, it} from 'node:test'
import CardForm from '../components/CardForm'
import {CardType} from '../types'
import '@testing-library/jest-dom'

const mockOnSave = jest.fn()
const mockOnCancel = jest.fn()
const mockOnDelete = jest.fn()

const cardData = {
    id: '1',
    cardholderName: 'John Doe',
    cardNumber: '4111111111111111',
    expiryDate: '12/24',
    cvv: '123',
    type: 'basic' as CardType,
}

describe('CardForm', () => {
    it('renders form inputs', () => {
        render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} card={cardData} onDelete={mockOnDelete}/>)

        expect(screen.getByLabelText(/Cardholder name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Card number/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Expiry date/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument()
    })

    it('validates empty form', async () => {
        render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} card={null}/>)
        fireEvent.click(screen.getByRole('button', {name: /Save/i}))

        expect(await screen.findByText(/Cardholder name is required/i)).toBeInTheDocument()
        expect(await screen.findByText(/Card number is invalid/i)).toBeInTheDocument()
    })

    it('calls onSave with valid data', async () => {
        render(<CardForm onSave={mockOnSave} onCancel={mockOnCancel} card={null}/>)

        userEvent.type(screen.getByLabelText(/Cardholder name/i), 'John Doe')
        userEvent.type(screen.getByLabelText(/Card number/i), '4111111111111111')
        userEvent.type(screen.getByLabelText(/Expiry date/i), '12/24')
        userEvent.type(screen.getByLabelText(/CVV/i), '123')

        fireEvent.click(screen.getByRole('button', {name: /Save/i}))

        expect(mockOnSave).toHaveBeenCalled()
    })
})
