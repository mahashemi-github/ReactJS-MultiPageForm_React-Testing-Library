import { render, screen } from '@testing-library/react'
import RootLayout from './RootLayout'

test('renders the title by text', () => {
  render(<RootLayout />)
  const headingElement = screen.getByText(/MyNoteBook/i)
  expect(headingElement).toBeInTheDocument()
})

// test('renders the title by role', () => {
//     render(<RootLayout />)
//     const headingElement = screen.getByRole("heading")
//     expect(headingElement).toBeInTheDocument()
// })

test('renders the title by role', () => {
    render(<RootLayout />)
    const headingElement = screen.getByRole("heading", {name: 'hooooo'})
    expect(headingElement).toBeInTheDocument()
})

test('renders the title by testId', () => {
    render(<RootLayout />)
    const headingElement = screen.getByTestId("header-2")
    expect(headingElement).toBeInTheDocument()
})

test('renders the title by text - queryBy', () => {
    render(<RootLayout />)
    const headingElement = screen.queryByText(/yyyyyy/i)
    expect(headingElement).not.toBeInTheDocument()
})

test('renders the title by text - getAll', () => {
    render(<RootLayout />)
    const headingElements = screen.getAllByRole("heading")
    expect(headingElements.length).toBe(2)
})