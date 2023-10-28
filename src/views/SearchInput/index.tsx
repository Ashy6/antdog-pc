import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useDispatch } from "react-redux";

import { updateOrderNO } from '../../store/reducers/selectState'
import './style.scss'

const { Search } = Input;

const SearchInput = () => {
    const dispatch = useDispatch()

    const onSearch: SearchProps['onSearch'] = (value) => {
        dispatch(updateOrderNO(value))
    };

    return <div className="search-input-component flex-center hw-100">
        <Search className="search-input" placeholder="Please enter the order number" onSearch={onSearch} size="middle" />
    </div>
}

export default SearchInput