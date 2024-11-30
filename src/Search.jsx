import { useState} from "react";

const Search = ({addToDos}) => {

    const [input,setInput] = useState('');

    const handleClick = () => {
        if(input.trim()){
            addToDos(input);
            setInput('')          
        }else{
            alert('Campo vacio')
        }
    }

    return (
        <div className='input-container'>
            <input 
            type="text" placeholder='Add an item'
            value={input}
            onChange={(event) => {
                setInput(event.target.value)
            }}
            />
            <button onClick={handleClick}>Add item</button>
        </div>
    )
    }

export default Search;