//! async/await делает из асинхронного кода стнхронный, а promise делает из асинхронного кода синхронный  
import React from 'react'
import qs from 'qs'


// import Categories from "../components/Categories";
// import Sort from "../components/Sort";
// import PizzaBlock from "../components/PizzaBlock"; // мы назвали index это для вебрака ибо тогда при импорте нам не нужно будет писать /PizzaBlock/PizzaBlock
// import Pagination from '../components/Pagination';
// import  Skeleton from "../components/PizzaBlock/Skeleton";

import {Categories, Sort, PizzaBlock, Pagination, Skeleton } from '../components'

import { sortList } from "../components/Sort";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFillters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncAction';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    const onChangeCategory = React.useCallback((id: number) => {
      dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (page: number) => {
      if(categoryId === 0) {
      dispatch(setCurrentPage(page)) 
      } else {
        dispatch(setCurrentPage(1))
      }
    }

    const getPizzas = async () => { // добовля асин.авейт все действия внутри в том числе и асинхроные выполняются по порядку
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
      const sortBy = sort.sortProperty.replace('-', '') 
      const category = categoryId ? `category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''
      // fetch(`https://63286fab9a053ff9aab7e0f2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      // )
      // .then(res => res.json())
      // .then(arr => {
      //   setItems(arr)
      //   setIsLoading(false)
      // })

      // await axios.get(`https://63286fab9a053ff9aab7e0f2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      // )
      // .then(res => {
      //   setItems(res.data)
      //   setIsLoading(false)
      // }).catch(err => {
      //  console.log(err)
      //})

      //try {
        dispatch(
          fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage: String(currentPage)
        }))

        window.scrollTo(0, 0)
      // } catch (error) {
      //   alert('Щшибка при получении пицц')
      //   console.log('ERROR', error)
      // } finally {
      //   setIsLoading(false)
      // }
    }

    React.useEffect(() => {
      if(isMounted.current) {
        const queryString = qs.stringify({
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        })
        console.log(queryString)
        
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])
  
    // React.useEffect(() => { 
    //   if(window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //     // console.log(params)
    //     //console.log(params.category)
        
    //     const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
    //     // console.log(sort)
    //     dispatch(
    //         setFillters({
    //         // ...params,
    //         // sort,
    //         searchValue: params.search,
    //         categoryId: Number(params.category),
    //         currentPage: Number(params.currentPage),
    //         sort: sort || sortList[0],
    //        })
    //     )
    //   }
    //   isSearch.current = true
    // }, [])

    React.useEffect(() => {
      window.scrollTo(0, 0)
      getPizzas()

    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj: any) => (
      <PizzaBlock key={obj.id} {...obj} 
      // title = {obj.title} 
      // price={obj.price} 
      // imageUrl={obj.imageUrl}
      // sizes={obj.sizes}
      // types={obj.types}
      />))
      // filter(obj => {
      //   if (obj.title.toLowerCase().includes(searchValue)) {
      //     return true
      //   } return false
      // }) статичная фильтрачия перед map
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
  
    return (
    <>
       <div className="content__top">
           <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort value={sort}/>  {/*value={sortType} onChangeSort={(id) => setSortType(id)} */}
          </div>
          {status === 'error'
            ? 
            (<div className='content__error-info'>
                <h2>Произошла ошибка <span>😕</span></h2>
                <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже</p>
            </div>) 
            : 
            (
              <>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
              </>
            )
          }
          {items.length == 0 && status !== 'error' && (
            <div className='content__error-info'>
              <h2>Ничего не найдено<span>😕</span></h2>
            </div>
          )}
          {categoryId == 0 ?  <Pagination currentPage={currentPage} onChangePage={onChangePage}/> : (<></>)}
    </>
  )
}

export default Home
