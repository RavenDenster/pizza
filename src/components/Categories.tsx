import React from "react";
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
  
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {  // можно написать ({value, onChangeCategory}: CategoriesProps)
  useWhyDidYouUpdate('Categories', {value, onChangeCategory})  
  
  return (
      <div className="categories">
      <ul >
        {categories.map((categoryName, index) => (
          <li 
          key={index} 
          onClick={() => onChangeCategory(index)} 
          className={value === index ? 'active' : ''}>
            {categoryName} 
          </li>
          ))}
      </ul>
    </div>
    )
  })

  export default Categories;