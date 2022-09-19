import React, {useContext} from 'react'
import {Types} from '../context/reducers'
import {TodoContext} from '../context/TodoContext'

function UploadButton() {

  const initialRef: any = null
  const hiddenFileInput = React.useRef(initialRef)
  const {todosDispatch} = useContext(TodoContext)

  const handleClick = () => {
    if (hiddenFileInput.current == null) return
    hiddenFileInput.current.click()
  }

  const handleChange = async (e:any) => {
    if (!e.target) return
    if (e.target.files && e.target.files[0]) {
      if (confirm(`Use tasks from "${e.target.files[0].name}"?\nThis will overwrite all current tasks.`)) {
        const updatedJSON = e.target.files[0]
        console.log(updatedJSON)
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0], 'UTF-8')
        fileReader.onload = e => {
          const target = e.target
          const result = target?.result
          let newTodos
          try {
            newTodos = JSON.parse(String(result))
          } catch {}
          todosDispatch({
            type: Types.Relist,
            payload: newTodos
          })
        }
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
      >Upload</button>
      <input
        type={'file'}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
        accept='application/json, .json'
      />
    </div>
  )
}

export default UploadButton