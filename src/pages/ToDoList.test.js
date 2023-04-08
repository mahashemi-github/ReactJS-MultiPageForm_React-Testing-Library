import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import ToDoList from './ToDoList'
import { DataContextProvider } from '../context/DataContext'

const MockToDoList = () => {
    return (
      <DataContextProvider>
        <BrowserRouter>
          <ToDoList />
        </BrowserRouter>
      </DataContextProvider>
    )
}

const addTask = (tasks) => {
    const taskInputElement = screen.getByLabelText(/task/i)  
    const timeintervalInputElement = screen.getByLabelText(/timeinterval/i)  
    const buttonElement = screen.getByRole("button", { name: /Add Task/i})

    tasks.forEach(({task, time}) => {
        fireEvent.change(taskInputElement, { target: { value: task } })
        fireEvent.change(timeintervalInputElement, { target: { value: time } })
        fireEvent.click(buttonElement)
    })
}

test('testing todo form inputs and button', () => {
    render(<MockToDoList />)
    // const headingElement = screen.getByRole("heading", {name: 'To-Dos'})
    // expect(headingElement).toBeInTheDocument()

    const taskInputElement = screen.getByLabelText(/task/i)
    expect(taskInputElement).toBeInTheDocument()

    const timeintervalInputElement = screen.getByLabelText(/timeinterval/i)
    expect(timeintervalInputElement).toBeInTheDocument()

    expect(taskInputElement.value).toBe("")
    expect(timeintervalInputElement.value).toBe("")

    fireEvent.click(taskInputElement)
    fireEvent.change(taskInputElement, { target: { value: "Hit the Gym" } })
    expect(taskInputElement.value).toBe("Hit the Gym")

    fireEvent.click(timeintervalInputElement)
    fireEvent.change(timeintervalInputElement, { target: { value: "8-10" } })
    expect(timeintervalInputElement.value).toBe("8-10")

    const buttonElement = screen.getByRole("button", { name: /Add Task/i})
    fireEvent.click(buttonElement)

    expect(taskInputElement.value).toBe("")
    expect(timeintervalInputElement.value).toBe("")
})

test('render a single item after clicking the add task button', () => {
    render(
        <MockToDoList />
    )
    addTask([{task:"Hit the Gym", time:"1-2"}])
    const TaskElement = screen.getByText(/Hit the Gym/i)
    const TimeElement = screen.getByText("1-2")

    expect(TaskElement).toBeInTheDocument()
    expect(TimeElement).toBeInTheDocument()
})

test('should render multiple items', () => {
    render(
        <MockToDoList />
    );
    addTask([{task:"Hit the Gym", time:"1-2"}, 
             {task:"Hit the Gym", time:"1-2"}, 
             {task:"Hit the Gym", time:"1-2"}])
    const TaskElements = screen.queryAllByText(/Hit the Gym/i)
    const TimeElements = screen.queryAllByText(/1-2/i)

    expect(TaskElements.length).toBe(3)
    expect(TimeElements.length).toBe(3)
})

test('Toggle todo-item-done items class', () => {
    render(
        <MockToDoList />
    )
    addTask([{task:"Hit the Gym", time:"1-2"}])
    const TaskElement = screen.getByText(/Hit the Gym/i)
    const TimeElement = screen.getByText(/1-2/i)

    expect(TaskElement).not.toHaveClass("todo-item-done")
    expect(TimeElement).not.toHaveClass("todo-item-done")

    fireEvent.click(TaskElement)
    expect(TaskElement).toHaveClass("todo-item-done")
    expect(TimeElement).toHaveClass("todo-item-done")

    fireEvent.click(TaskElement)
    expect(TaskElement).not.toHaveClass("todo-item-done")
    expect(TimeElement).not.toHaveClass("todo-item-done")

    fireEvent.click(TimeElement)
    expect(TaskElement).toHaveClass("todo-item-done")
    expect(TimeElement).toHaveClass("todo-item-done")

    fireEvent.click(TimeElement)
    expect(TaskElement).not.toHaveClass("todo-item-done")
    expect(TimeElement).not.toHaveClass("todo-item-done")
})

test('Task left item test', () => {
    render(
        <MockToDoList />
    )
    const TaskLeftElementCheck = screen.getByText(/0 task left/i)
    expect(TaskLeftElementCheck).toBeInTheDocument()

    addTask([{task:"Hit the Gym1", time:"1-21"}])
    const TaskLeftElement = screen.getByText(/1 task left/i)
    expect(TaskLeftElement).toBeInTheDocument()

    addTask([{task:"Hit the Gym2", time:"1-22"}, 
             {task:"Hit the Gym3", time:"1-23"}, 
             {task:"Hit the Gym4", time:"1-24"}])

    const MoreTaskLeftElement = screen.getByText(/4 tasks left/i)
    expect(MoreTaskLeftElement).toBeInTheDocument()
})    

test('Task left item test after toggling todo-item-done items class', () => {
    render(
        <MockToDoList />
    )
    const TaskLeftElementCheck = screen.getByText(/0 task left/i)
    expect(TaskLeftElementCheck).toBeInTheDocument()

    addTask([{task:"Hit the Gym1", time:"1-21"}])
    const TaskLeftElement = screen.getByText(/1 task left/i)
    expect(TaskLeftElement).toBeInTheDocument()

    addTask([{task:"Hit the Gym2", time:"1-22"}, 
             {task:"Hit the Gym3", time:"1-23"}, 
             {task:"Hit the Gym4", time:"1-24"}])

    const MoreTaskLeftElement = screen.getByText(/4 tasks left/i)
    expect(MoreTaskLeftElement).toBeInTheDocument()

    const SelectedTaskElement = screen.getByText(/Hit the Gym1/i)
    expect(SelectedTaskElement).not.toHaveClass("todo-item-done")
    
    fireEvent.click(SelectedTaskElement)
    expect(SelectedTaskElement).toHaveClass("todo-item-done")
    expect(screen.getByText(/3 tasks left/i)).toBeInTheDocument()

    fireEvent.click(SelectedTaskElement)
    expect(screen.getByText(/4 tasks left/i)).toBeInTheDocument()
})    

test('deleting an item test - number of items left test', () => {
    render(
        <MockToDoList />
    )
    const TaskLeftElementCheck = screen.getByText(/0 task left/i)
    expect(TaskLeftElementCheck).toBeInTheDocument()

    addTask([{task:"Hit the Gym2", time:"1-22"}, 
             {task:"Hit the Gym3", time:"1-23"}, 
             {task:"Hit the Gym4", time:"1-24"}])

    const SelectedTaskElement = screen.getByTestId('todo-item-0')
    expect(SelectedTaskElement).toBeInTheDocument()    
    const deleteButton = within(SelectedTaskElement).getByText(/delete/i)   
    fireEvent.click(deleteButton)  
    expect(screen.getByText(/2 tasks left/i)).toBeInTheDocument()
    const AllTaskElements = screen.queryAllByTestId(/todo-item/i)  
    expect(AllTaskElements.length).toBe(2)


    const SelectedTaskElement2 = screen.getByTestId('todo-item-1')
    expect(SelectedTaskElement2).toBeInTheDocument()    
    const deleteButton2 = within(SelectedTaskElement2).getByText(/delete/i)   
    fireEvent.click(deleteButton2)  
    expect(screen.getByText(/1 task left/i)).toBeInTheDocument()
    const AllTaskElements2 = screen.queryAllByTestId(/todo-item/i)  
    expect(AllTaskElements2.length).toBe(1)

})  

test('Followers Link Click', async() => {
    render(
        <MockToDoList />
    )
    const followersBtn = screen.getByRole("button", {name: 'Followers'})
    expect(followersBtn).toBeInTheDocument()
 
    const followerItem = screen.queryByTestId('follower-item-0')
    expect(followerItem).toBeFalsy()

    userEvent.click(followersBtn)
    // expect(followersBtn).toHaveClass('activee')

    expect(await screen.findByTestId('follower-item-0')).toBeInTheDocument()
    expect(screen.queryByTestId('follower-item-0')).toBeTruthy()
    const allFollowerItems = await screen.findAllByTestId(/follower-item/i)
    expect(allFollowerItems.length).toBe(3)

    fireEvent.click(followersBtn)
    
    expect(screen.queryByTestId('follower-item-0')).toBeFalsy()
})  
