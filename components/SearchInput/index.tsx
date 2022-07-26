import React, { useState } from 'react';
import styles from './styles.module.css';

type Props = {
    mainColor: string;
    onSearch: (searchValue: string) => void;
}

const SearchInput = ({ mainColor, onSearch }: Props) => {
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter') {
            onSearch(searchValue)
        }
    }

    return (
        <div
            className={styles.container}
            style={{ borderColor: focused ? mainColor : '#fff' }}
        >
            <div
                className={styles.button}
                onClick={()=>onSearch(searchValue)}
            ></div>
            <input
                className={styles.input}
                type='text'
                placeholder='Digite o nome do produto'
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                onKeyUp={handleKeyUp}
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
            />
        </div>
    )
}

export default SearchInput;