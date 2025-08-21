import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' 
import AppFunctional from './AppFunctional'

beforeEach(() => {
  render(<AppFunctional />)
})

test('renders with initial state', () => {
  expect(screen.getByText(/Coordinates\s*\(2,\s*2\)/i)).toBeInTheDocument()
  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument()
  expect(screen.getByText('B')).toBeInTheDocument()
})


