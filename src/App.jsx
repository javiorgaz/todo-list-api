import { useEffect, useState } from 'react'

function App() {

  const [list,setList] = useState([]);

  
  const añadirItems = (contenido) => {
      if(contenido.target.value === ''){
        alert('Introduce un nombre...');
        return
      }
      const listCopy = [...list];
      listCopy.unshift(contenido.target.value);
      setList(listCopy);
      contenido.target.value = '';
  }

  const eliminarItems = (index) => {
    const listCopy = [...list]
    listCopy.splice(index,1);
    setList(listCopy)
  }

  const removeAll = () => {
    const listCopy = [];
    setList(listCopy);
  }

  useEffect(()=>{
    console.log(list)
  },[list])


  return (
    <div className='container'>

      <div className='header'>
        <h2>ToDo List</h2>
        <i className="icono fa-solid fa-check"></i>
        
      </div>
      
      <div onKeyUp={(event) => {
        if(event.code === 'Enter'){
          return añadirItems(event)
        }
        }} 
        className='list-container'>
        <input type="text" placeholder='Tarea a realizar...'/>
        <ul>
          {list.map((item,index)=>{
            return <li key={index}>{item}<i onClick={()=> eliminarItems(index)} className=" close fa-solid fa-xmark"></i></li>
          })}
        </ul>
        <p>{list.length} Items left</p>
      </div>
      <div className='footer'>
        <button onClick={() => removeAll()}>Eliminar lista</button>
      </div>
    </div>
  )
      
}

export default App
