import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const initialPizza = {
    name: '',
    size: '',
    pepperoni: '',
    sausage: '',
    onions: '',
    mushroom: '',
    instructions: ''
};


export default function Pizza(props){
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [errors, setErrors] = useState(initialPizza);
    const[pizza, setPizza] = useState(initialPizza);
    


    const formSchema = yup.object().shape({
        name: yup.string().min(2, "name must be more than 2 letters"),
        size: yup.string()
    });

    const validateChange = (e) => {
        if( e.target.name === 'name' || e.target.name === 'size'){
            yup
            .reach(formSchema, e.target.name) // get the value out of schema at key "e.target.name" --> "name="
            .validate(e.target.value) // value in input
            .then(valid => {
            // if passing validation, clear any error
            setErrors({ ...errors, [e.target.name]: "" });
            })
            .catch(err => {
            // if failing validation, set error in state
            console.log("error!", err);
            setErrors({ ...errors, [e.target.name]: err.errors[0] });
            });
        };
    };

    useEffect(() => {
        formSchema.isValid(pizza).then(valid => {
          console.log("valid?", valid);
          setIsButtonDisabled(!valid);
        });
      }, [pizza]);

    const submitOrder =(e)=> {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", pizza)
        .then(response => {
            console.log(response.data);
            setPizza({
                name: '',
                size: '',
                pepperoni: '',
                sausage: '',
                onions: '',
                mushroom: '',
                instructions: ''}
            )
        })
      .catch(err => {
            console.log(err)
      });
        setButtonDisabled(true);
    }
    
    
    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        e.persist();
        const newPizza = {
            ...pizza, 
            [e.target.name]: e.target.type === "checkbox"? e.target.checked : e.target.value,
        }
        if(e.target.type === 'checkbox'){
            console.log('checkbox', e.target.checked);
        }
        validateChange(e);
        setPizza(newPizza);
    }

    return(
        <div className="form">
            <form onSubmit={submitOrder}>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input 
                        name = 'name'
                        type='text'
                        id = 'name'
                        data-cy='name'
                        placeholder = 'name'
                        value = {pizza.name}
                        required
                        onChange={onInputChange}
                     />
                      {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor='size'>Pizza Size</label>
                    <select id='size' name='size' data-cy='size' value={pizza.size} required onChange={onInputChange}>
                        <option value=''>--select your size--</option>
                        <option value='small'>small</option>
                        <option value='medium'>medium</option>
                        <option value='large'>large</option>
                    </select>
                </div>
                <div className='form-group'>
                <label htmlFor="pepperoni" className="toppings">Pepperoni</label>
                    <input
                    type="checkbox"
                    name="pepperoni"
                    checked={pizza.pepperoni}
                    onChange={onInputChange}
                    />
                    <label htmlFor="sausage" className="toppings">Sausage</label>
                    <input
                    type="checkbox"
                    name="sausage"
                    checked={pizza.sausage}
                    onChange={onInputChange}
                    />
                    <label htmlFor="onions" className="toppings">Onions</label>
                    <input
                    type="checkbox"
                    name="onions"
                    checked={pizza.onions}
                    onChange={onInputChange}
                    />
                    <label htmlFor="mushroom" className="toppings">Mushroom</label>
                    <input
                    type="checkbox"
                    name="mushroom"
                    checked={pizza.mushroom}
                    onChange={onInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='instructions'>Special Instructions</label>
                    <textarea id='instructions' name='instructions' data-cy='instructions' value={pizza.instructions} onChange={onInputChange}>
                    </textarea>
                </div>
                <button disabled={isButtonDisabled} type="submit">
                    Add to Order
                </button>
            </form>
        </div>
    )
}