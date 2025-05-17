import { render, screen } from '@testing-library/react'
import CardForm from '../components/CardForm'

describe('CardForm', () => {
  it('renders card form with Save button', () => {
    render(<CardForm card={null} onCancel={() => {}} onSave={() => {}} />)
    expect(screen.getByText('Save')).toBeInTheDocument()
  })
})
