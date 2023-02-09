import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {

  const [ pizza, setPizza ] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>() 

  const { id } = useParams() 
  const navigate = useNavigate()

  let ingredients= ["моцарелла", "картофель из печи", "красный лук", "чеснок", "фирменный томатный", "соус ранч", "ветчина", 
  "фирменный соус альфредо", "сладкий перец", "Фирменный томатный соус", "бекон", "цыпленок", "сыры чеддер и пармезан",
  "кубики брынзы", "итальянские травы", " томаты", "сыры чеддер и пармезан", "моцарелла", "маринованные огурчики", "фирменный томатный соус"]

  React.useEffect(() => {
    async function fetchPizza() {
        try {
        const { data } = await axios.get('https://63286fab9a053ff9aab7e0f2.mockapi.io/items/' + id)
        console.log(data)
        setPizza(data)
        } catch (error) {
            navigate('/')
            alert('Ошибка при получении пиццы!')
        }
    }
    fetchPizza()
  }, [])

  if(!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 1000, gap: 100}}>
        <img style={{maxWidth: 400}} src={pizza.imageUrl}/>
        <div >
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
          {ingredients.map((ingredient, i) => 
              <span key={i}>{ingredient}, </span>
            )}
        </div>
      </div>
      <Link to='/'>
        <button className="button button--outline button--add">           
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
