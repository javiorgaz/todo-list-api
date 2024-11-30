import {useState,useEffect} from 'react'
import Search from './Search';


function App() {

  const base_url = 'https://playground.4geeks.com/todo';
  const name = 'javier';
  const [list,setList] = useState([]);
    


  //OBTENER LA API
  const obtenerAPI = () => {
    fetch(`${base_url}/users/${name}`)
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener la lista de to-dos');
        return response.json();
      })
      .then((data) => setList(data.todos)) // Actualiza el estado con la lista completa
      .catch((error) => console.error('Error:', error));
  };

    //FUNCION AÑADIR
    const addItem = (input) => {

      const body = {
        'label': input,
        'done':false,
      }

      fetch(`${base_url}/todos/${name}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(body)

      })
      .then(response => {
        if(!response.ok){
          throw new Error('Error el cargar el item')
        }
        // return response.json();
      })
      .then(()=> obtenerAPI())
      .catch(error  => console.log(error))
    };


    //FUNCION BORRAR
    const deleteItem = (id) => {
      fetch(`${base_url}/todos/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'accept': 'application/json'
        },

      })
      .then(response => {
        if(!response.ok){
          throw new Error('Error el cargar el item')
        }
        // return response.json();
      })
      .then(()=> obtenerAPI())
      .catch(error  => console.log(error))
    };


    //DELETE ALL
   
    const deleteAll = () => {
      Promise.all(
        list.map((item) => {
          return fetch(`${base_url}/todos/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
            },
          });
        })
      )
        .then(() => {
          console.log('Todos los elementos fueron eliminados.');
          setList([]); // Limpia la lista localmente
        })
        .catch((error) => console.error('Error al eliminar todos los elementos:', error));
    }
    
    
    
    useEffect(() => {
      obtenerAPI();
    },[])


  return (
    <div className='container'>
        <div className='content-container'>
            {/* Header */}
            <div className='header'>
              <h1>Todo-List API</h1>
            </div>
      {/* Search */}
      <Search addToDos = {addItem}/>
      {/* List */}
      <div className='list-container'>
        <ul>
          {list.map((item,index)=> <li key={index}>{item.label}<i onClick={() => deleteItem(item.id)} className="xmark fa-solid fa-xmark"></i></li>)}
        </ul>
      </div>
      <div className='delete-container'>
        <button onClick={deleteAll} >Delete all items</button>
      </div>
      {/* Footer */}
        </div>
        <div className='footer-container'>
          <p>Made By Javier Orgaz</p>
        </div>
      
    </div>
  )
      
}

export default App
