import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import './style.scss'

export const SearchInput = () => {

    const { Search } = Input;

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value)
    };

    return <div className="search-input-component flex-center hw-100">
        <Search className="search-input" placeholder="Please enter the order number" onSearch={onSearch} size="middle" />
    </div>
}