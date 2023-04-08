import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import SubscriptionForm from './SubscriptionForm'
import { DataContextProvider } from '../context/DataContext'

const MockSubscriptionForm = () => {
    return (
      <DataContextProvider>
        <BrowserRouter>
          <SubscriptionForm />
        </BrowserRouter>
      </DataContextProvider>
    )
}

test('renders the title by role', () => {
    render(<MockSubscriptionForm />)
    const headingElement = screen.getByRole("heading", {name: 'Subscription Form'})
    expect(headingElement).toBeInTheDocument()
})

////// The following two tests will work with <form aria-label="myform" onSubmit={handleSubmit}>

// test('renders the form 1', () => {
//     render(<MockSubscriptionForm />)
//     const headingElement = screen.getByRole("form", { hidden: true })
//     expect(headingElement).toBeInTheDocument()
// })

// test('renders the form 2', () => {
//     render(<MockSubscriptionForm />)
//     const headingElement = screen.getByRole("form", { name: "myform" })
//     expect(headingElement).toBeInTheDocument()
// })

// test('renders the button', () => {
//     render(<MockSubscriptionForm />)
//     const btnElement = screen.getByRole("button")
//     expect(btnElement).toBeInTheDocument()
// })

test('renders the username input', () => {
    render(<MockSubscriptionForm />)
    const userInputElement = screen.getByLabelText(/username/i)
    expect(userInputElement).toBeInTheDocument()
})

test('renders the email input', () => {
    render(<MockSubscriptionForm />)
    const emailInputElement = screen.getByLabelText(/email/i)
    expect(emailInputElement).toBeInTheDocument()
})

test('renders the password input', () => {
    render(<MockSubscriptionForm />)
    const passInputElement = screen.getByLabelText('Password')
    expect(passInputElement).toBeInTheDocument()
})

test('renders the password confirm input', () => {
    render(<MockSubscriptionForm />)
    const passConfirmInputElement = screen.getByLabelText(/confirm password/i)
    expect(passConfirmInputElement).toBeInTheDocument()
})

test("inputs should be initially empty", () => {
    render(<MockSubscriptionForm />)
    expect(screen.getByLabelText(/username/i).value).toBe("")
    expect(screen.getByLabelText(/email/i).value).toBe("")
    expect(screen.getByLabelText("Password").value).toBe("")
    expect(screen.getByLabelText(/confirm password/i).value).toBe("")
})

test("should be able to type an username in input", () => {
    render(<MockSubscriptionForm />)
    const userInputElement = screen.getByLabelText(/username/i)
    act(() => {
       userEvent.type(userInputElement, "Mari" )
    })
    expect(userInputElement.value).toBe("Mari")
})

test("should be able to type an email in input", () => {
    render(<MockSubscriptionForm />)
    const emailInputElement = screen.getByLabelText(/email/i)
    act(() => {
       userEvent.type(emailInputElement, "mari@email.com")
    })
    expect(emailInputElement.value).toBe("mari@email.com")
    expect(emailInputElement).toHaveValue("mari@email.com")
})

test("should be able to type a password in input", () => {
    render(<MockSubscriptionForm />)
    const passInputElement = screen.getByLabelText('Password')
    act(() => {
       userEvent.type(passInputElement, "password!")
    })
    expect(passInputElement.value).toBe("password!")
})

test("should be able to type a confirm password in input", () => {
    render(<MockSubscriptionForm />)
    const passConfirmInputElement = screen.getByLabelText(/confirm password/i)
    act(() => {
       userEvent.type(passConfirmInputElement, "password!")
    })
    expect(passConfirmInputElement.value).toBe("password!")
})


test("Info and Done messages before and after writing into username input", () => {

    render(<MockSubscriptionForm />)
    const userInputElementInfo = screen.queryByText(/Username Instructions/i)
    expect(userInputElementInfo).toHaveClass("hideIns")

    const userInputElementDone = screen.queryByText(/Valid Username/i)
    expect(userInputElementDone).toHaveClass("hide")

    const userInputElement = screen.getByLabelText(/username/i)
    act(() => {
        userEvent.type(userInputElement, "Mari" )
    })

    expect(userInputElementDone).toHaveClass("hide")
    expect(userInputElementInfo).toHaveClass("instructions")

    fireEvent.focusOut(userInputElement)

    expect(userInputElementDone).toHaveClass("hide")
    expect(userInputElementInfo).toHaveClass("hideIns")

    fireEvent.change(userInputElement, { target: { value: "Mariii" } })
    expect(userInputElementDone).toHaveClass("show")
    expect(userInputElementInfo).toHaveClass("hideIns")
  })

  test("Info and Done messages before and after writing into email input", () => {

    render(<MockSubscriptionForm />)
    const emailInputElementInfo = screen.queryByText(/Email Instructions/i)
    expect(emailInputElementInfo).toHaveClass("hideIns")

    const emailInputElementDone = screen.queryByText(/Valid Email/i)
    expect(emailInputElementDone).toHaveClass("hide")

    const emailInputElement = screen.getByLabelText(/email/i)
    act(() => {
        userEvent.type(emailInputElement, "mari" )
    })

    expect(emailInputElementDone).toHaveClass("hide")
    expect(emailInputElementInfo).toHaveClass("instructions")

    fireEvent.focusOut(emailInputElement)

    expect(emailInputElementDone).toHaveClass("hide")
    expect(emailInputElementInfo).toHaveClass("hideIns")

    fireEvent.change(emailInputElement, { target: { value: "mari@email.com" } })
    expect(emailInputElementDone).toHaveClass("show")
    expect(emailInputElementInfo).toHaveClass("hideIns")
  })

  test("Info and Done messages before and after writing into password input", () => {

    render(<MockSubscriptionForm />)
    const passInputElementInfo = screen.queryByText(/Password Instructions/i)
    expect(passInputElementInfo).toHaveClass("hideIns")

    const passInputElementDone = screen.queryByText(/Valid Password/i)
    expect(passInputElementDone).toHaveClass("hide")

    const passInputElement = screen.getByLabelText('Password')
    act(() => {
        userEvent.type(passInputElement, "qqqq" )
    })

    expect(passInputElementDone).toHaveClass("hide")
    expect(passInputElementInfo).toHaveClass("instructions")

    fireEvent.focusOut(passInputElement)

    expect(passInputElementDone).toHaveClass("hide")
    expect(passInputElementInfo).toHaveClass("hideIns")

    fireEvent.change(passInputElement, { target: { value: "Q!1qqqqq" } })
    expect(passInputElementDone).toHaveClass("show")
    expect(passInputElementInfo).toHaveClass("hideIns")
  })

  test("Info and Done messages before and after writing into confirm password input", () => {

    render(<MockSubscriptionForm />)

    const passConfirmInputElementDone = screen.queryByText(/Password Confirmed/i)
    expect(passConfirmInputElementDone).toHaveClass("hide")

    const passConfirmInputElement = screen.getByLabelText('Confirm Password')
    const passInputElement = screen.getByLabelText('Password')

    fireEvent.change(passInputElement, { target: { value: "Q!1qqqqq" } })
    fireEvent.change(passConfirmInputElement, { target: { value: "qqqq" } })

    expect(passConfirmInputElement).toHaveClass("errorinput")
    expect(passConfirmInputElementDone).toHaveClass("hide")

    fireEvent.change(passInputElement, { target: { value: "Q!1qqqqq" } })
    fireEvent.change(passConfirmInputElement, { target: { value: "Q!1qqqqq" } })

    expect(passInputElement).not.toHaveClass("errorinput")
    expect(passConfirmInputElement).not.toHaveClass("errorinput")
    expect(passConfirmInputElementDone).toHaveClass("show")
  })

  test("Info and Done messages before and after selecting an skill option input", () => {

    render(<MockSubscriptionForm />)
    const selectInputElementInfo = screen.queryByText(/Required, please select a skill/i)
    expect(selectInputElementInfo).toHaveClass("hideIns")

    const selectInputElementDone = screen.queryByText(/A skill is selected/i)
    expect(selectInputElementDone).toHaveClass("hide")

    const selectInputElement = screen.getByLabelText('Select your skill')
    // const selectInputElement = screen.getByTestId('selectInput')
    expect(selectInputElement.value).toBe("Select...")

    expect(screen.getByRole('option', {name: 'Select...'}).selected).toBe(true)

    fireEvent.focusOut(selectInputElement)

    expect(selectInputElementDone).toHaveClass("hide")
    expect(selectInputElementInfo).not.toHaveClass("instructions")

    fireEvent.focusIn(selectInputElement)
    
    expect(selectInputElementDone).toHaveClass("hide")
    expect(selectInputElementInfo).toHaveClass("instructions")

    //// userEvent does **NOT** works for either of toHaveClass("show") and toHaveClass("hideIns")
    // userEvent.selectOptions(selectInputElement, "React")
    // expect(selectInputElement.value).toBe("React")

    // expect(selectInputElementDone).toHaveClass("show")
    // expect(selectInputElementInfo).toHaveClass("hideIns")

    // userEvent.selectOptions(
    //   screen.getByRole('combobox'),
    //   screen.getByRole('option', {name: 'React'}),
    // )
    // expect(screen.getByRole('option', {name: 'React'}).selected).toBe(true)

    act( () => {
    fireEvent.change(selectInputElement, { target: { value: "Javascript" } })
    expect(selectInputElement.value).toBe("Javascript")
    })

    expect(selectInputElementDone).toHaveClass("show")
    expect(selectInputElementInfo).toHaveClass("hideIns")
  })

  test("NewsLetter input checked or not", () => {

    render(<MockSubscriptionForm />)
    const checkInputElement = screen.getByLabelText('Subscribe to our newsletter')
    // expect(checkInputElement.value).toBe("false")

    expect(screen.queryByRole("checkbox")).not.toBeChecked()

    // fireEvent.change(checkInputElement, { target: { value: "true" } })
    // expect(checkInputElement.value).toBe("true")

    act( () => {
      userEvent.click(screen.getByRole("checkbox"))
    })
    expect(screen.queryByRole("checkbox")).toBeChecked()

  })


  test("Before submiting the form no error, no Info but all with Done messages", () => {

    render(<MockSubscriptionForm />)
    const userInputElement = screen.getByLabelText(/username/i)
    const emailInputElement = screen.getByLabelText(/email/i)
    const passInputElement = screen.getByLabelText('Password')
    const passConfirmInputElement = screen.getByLabelText('Confirm Password')
    const selectInputElement = screen.getByLabelText('Select your skill')

    const userInputElementInfo = screen.queryByText(/Username Instructions/i)
    const emailInputElementInfo = screen.queryByText(/Email Instructions/i)
    const passInputElementInfo = screen.queryByText(/Password Instructions/i)
    const selectInputElementInfo = screen.queryByText(/Required, please select a skill/i)

    const userInputElementDone = screen.queryByText(/Valid Username/i)
    const emailInputElementDone = screen.queryByText(/Valid Email/i)
    const passInputElementDone = screen.queryByText(/Valid Password/i)
    const passConfirmInputElementDone = screen.queryByText(/Password Confirmed/i)
    const selectInputElementDone = screen.queryByText(/A skill is selected/i)

    expect(userInputElement.value).toBe("")
    expect(emailInputElement.value).toBe("")
    expect(passInputElement.value).toBe("")
    expect(passConfirmInputElement.value).toBe("")
    expect(selectInputElement.value).toBe("Select...")
    
    expect(userInputElement).not.toHaveClass("errorinput")
    expect(emailInputElement).not.toHaveClass("errorinput")
    expect(passInputElement).not.toHaveClass("errorinput")
    expect(passConfirmInputElement).not.toHaveClass("errorinput")

    expect(userInputElementInfo).toHaveClass("hideIns")
    expect(emailInputElementInfo).toHaveClass("hideIns")
    expect(passInputElementInfo).toHaveClass("hideIns")
    expect(selectInputElementInfo).toHaveClass("hideIns")

    expect(userInputElementDone).toHaveClass("hide")
    expect(emailInputElementDone).toHaveClass("hide")
    expect(passInputElementDone).toHaveClass("hide")
    expect(passConfirmInputElementDone).toHaveClass("hide")
    expect(selectInputElementDone).toHaveClass("hide")

    fireEvent.change(userInputElement, { target: { value: "Mariii" } })
    fireEvent.change(emailInputElement, { target: { value: "mari@email.com" } })
    fireEvent.change(passInputElement, { target: { value: "Q!1qqqqq" } })
    fireEvent.change(passConfirmInputElement, { target: { value: "Q!1qqqqq" } })
    fireEvent.change(selectInputElement, { target: { value: "Javascript" } })

    expect(userInputElement).not.toHaveClass("errorinput")
    expect(emailInputElement).not.toHaveClass("errorinput")
    expect(passInputElement).not.toHaveClass("errorinput")
    expect(passConfirmInputElement).not.toHaveClass("errorinput")

    expect(userInputElementInfo).toHaveClass("hideIns")
    expect(emailInputElementInfo).toHaveClass("hideIns")
    expect(passInputElementInfo).toHaveClass("hideIns")
    expect(selectInputElementInfo).toHaveClass("hideIns")

    expect(userInputElementDone).toHaveClass("show")
    expect(emailInputElementDone).toHaveClass("show")
    expect(passInputElementDone).toHaveClass("show")
    expect(passConfirmInputElementDone).toHaveClass("show")
    expect(selectInputElementDone).toHaveClass("show")

    const submitBtnElement = screen.getByRole("button", { name: /Subscribe/i })
    fireEvent.click(submitBtnElement)

    expect(userInputElement.value).toBe("")
    expect(emailInputElement.value).toBe("")
    expect(passInputElement.value).toBe("")
    expect(passConfirmInputElement.value).toBe("")
    expect(selectInputElement.value).toBe("Select...")

    expect(userInputElement).not.toHaveClass("errorinput")
    expect(emailInputElement).not.toHaveClass("errorinput")
    expect(passInputElement).not.toHaveClass("errorinput")
    expect(passConfirmInputElement).not.toHaveClass("errorinput")

    expect(userInputElementInfo).toHaveClass("hideIns")
    expect(emailInputElementInfo).toHaveClass("hideIns")
    expect(passInputElementInfo).toHaveClass("hideIns")
    expect(selectInputElementInfo).toHaveClass("hideIns")

    expect(userInputElementDone).toHaveClass("hide")
    expect(emailInputElementDone).toHaveClass("hide")
    expect(passInputElementDone).toHaveClass("hide")
    expect(passConfirmInputElementDone).toHaveClass("hide")
    expect(selectInputElementDone).toHaveClass("hide")

  })

