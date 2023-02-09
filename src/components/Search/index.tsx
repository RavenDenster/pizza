import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
    const dispach = useDispatch();
    const [value, setValue] = React.useState('');
    //const { setSearchValue} = React.useContext(SearchContext) // если я передам это стейт в value то он будет менятся каждую секунду
    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispach(setSearchValue(str));
        }, 500),
        [],
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // теперь значение будет меняться только при ChangeInput
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    const onClickClear = () => {
        dispach(setSearchValue(''));
        setValue('');
        // if(inputRef.current) {
        //   inputRef.current.focus()
        // }
        inputRef.current?.focus(); // .? значит, что если не существует правой части, то он её и не будет выполнять
    };

    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
                </g>
            </svg>

            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />

            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    height="48"
                    viewBox="0 0 48 48"
                    width="48"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            )}
        </div>
    );
};

export default Search;
