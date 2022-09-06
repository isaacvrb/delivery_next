import React, { useState } from 'react';
import styles from './styles.module.css';
import SearchIcon from './searchIcon.svg';
import { useAppContext } from '../../contexts/app';

type Props = {
    onSearch: (searchValue: string) => void;
};

const SearchInput = ({ onSearch }: Props) => {
    const { tenant } = useAppContext();

    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // if(event.code === 'Enter') {
        onSearch(searchValue);
        // }
    };

    return (
        <div
            className={styles.container}
            style={{ borderColor: focused ? tenant?.mainColor : '#fff' }}
        >
            <div
                className={styles.button}
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={tenant?.mainColor} />
            </div>
            <input
                className={styles.input}
                type="text"
                placeholder="Digite o nome do produto"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
