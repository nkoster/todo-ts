import React, {useContext} from 'react'
import {TodoContext} from '../context/TodoContext'
import './ButtonBox.css'
import UploadButton from './UploadButton'
import {Types} from '../context/TodoReducers'
import {uuid} from '../util'

function ButtonBox() {

  const {todosState, todosDispatch} = useContext(TodoContext)

  const newTask = (): void => {
    const color = {
      red: Math.floor(Math.random() * 100 + 150),
      green: Math.floor(Math.random() * 100 + 150),
      blue: Math.floor(Math.random() * 100 + 150)
    }
    if (confirm('Create new task?')) {
      todosDispatch({
        type: Types.Create,
        payload: {
          id: uuid(),
          title: 'New Task',
          task: '- ~~add new task~~\n- do more stuff',
          showTask: true,
          state: 'todo',
          color: color
        }
      })
    }
  }

  const downloadJson = () => {
    const saveTemplateAsFile = (filename:string, dataObjToWrite:any) => {
      const blob = new Blob([JSON.stringify(dataObjToWrite)], {type: 'text/json'})
      const link = document.createElement('a')

      link.download = filename
      link.href = window.URL.createObjectURL(blob)
      link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')

      const evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })

      link.dispatchEvent(evt)
      link.remove()
    }
    const currentPath = window.location.pathname
    saveTemplateAsFile(
      `todos${currentPath == '/' ? '' : `-${currentPath.slice(1)}`}.json`,
      todosState.todos
    )
  }

  return (
    <div className={'ButtonBox'}>
      <button
        onClick={newTask}
      >+</button>
      <button
        onClick={downloadJson}
        disabled={todosState.todos.length == 0}
      >↓</button>
      <UploadButton />
    </div>
  )
}

export default ButtonBox
