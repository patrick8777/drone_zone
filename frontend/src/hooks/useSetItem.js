import {useState} from 'react';
const useSetItem = () => {
    const [value, setValue] = useState('');
    const setItemValue = (event) => {
        setValue(event.target.value);
    };
    return [value, setItemValue];
};
export default useSetItem;