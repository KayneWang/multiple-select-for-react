import React from 'react';
import { Select, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './MultipleSelect.less';

class MultipleSelect extends React.PureComponent {
  static defaultProps = {
    style: { width: 300 },
    items: {}
  };
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    items: PropTypes.object, // { key: title }
    handleSearch: PropTypes.func.isRequired,
    value: PropTypes.object
  };
  rcSelect = undefined;
  curSelectedKey = undefined; // 当前选中的数据 key
  selectedData = {}; // 当前选中的数据
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      open: false,
      items: props.items
    };
  }
  componentDidMount() {
    const { value } = this.props;
    this.rcSelect = this.refs['multiple_select'].rcSelect;
    this.rcSelect.onInputKeyDown = this.keyDown;
    const mSelect = document.getElementById('m-select');
    mSelect.onclick = this.selectFocus;
    document.onmouseup = e => {
      if (!mSelect.contains(e.target)) {
        this.selectBlur();
      }
    };
    if (value) {
      this.selectedData = value;
      this.initValue();
    }
  }
  initValue = () => {
    const { items, value } = this.props;
    const initValue = [];
    for (let k of Object.keys(value)) {
      let item = `${items[k]}:${value[k]}`;
      initValue.push(item);
    }
    this.setState({
      value: initValue
    });
  };
  selectFocus = () => {
    // console.log('select focus');
    const { items } = this.props;
    const itemKeys = Object.keys(items);
    const selectedKeys = Object.keys(this.selectedData);
    const curKeys = _.difference(itemKeys, selectedKeys);
    let newItems = {};
    curKeys.forEach(value => {
      newItems[value] = items[value];
    });
    this.setState({
      open: true,
      items: newItems
    });
    this.rcSelect.focus();
  };
  selectBlur = () => {
    this.setState({ open: false });
  };
  keyDown = e => {
    if (e.keyCode === 13) {
      // 确认选择
      try {
        let inputValue = this.rcSelect.state.inputValue;
        if (inputValue !== '') {
          this.selectedData[this.curSelectedKey] = inputValue.split(':')[1];
          this.setState(({ value }) => ({
            value: _.concat(value, inputValue)
          }));
        }
        this.setState({
          open: false
        });
        this.rcSelect.setInputValue('');
        this.rcSelect.blur();
        // 回调输出
        this.props.handleSearch(this.selectedData);
      } catch (error) {
        console.log('获取 rc-select input value 失败：', error);
      }
    }
    if (e.keyCode === 8) {
      // 删除操作
      let value = this.rcSelect.inputRef.defaultValue;
      if (value !== '') {
        this.setState({
          open: true
        });
      } else {
        let lastKey = _.findLastKey(this.selectedData);
        delete this.selectedData[lastKey];
        this.setState(({ value }) => ({
          value: _.dropRight(value)
        }));
      }
    }
  };
  menuClick = ({ key }) => {
    const { items } = this.state;
    let value = `${items[key]}:`;
    this.curSelectedKey = key;
    this.rcSelect.setInputValue(value);
  };
  handleDeselect = item => {
    let index = this.state.value.indexOf(item);
    let key = Object.keys(this.selectedData)[index];
    delete this.selectedData[key];
    this.setState(({ value }) => ({
      value: _.pull(value, item),
      open: false
    }));
    this.props.handleSearch(this.selectedData);
  };
  render() {
    const { style, placeholder } = this.props;
    const { items, open, value } = this.state;
    return (
      <div className="multiple-select">
        <Icon type="search" className="icon" />
        <Select
          id="m-select"
          ref="multiple_select"
          mode="tags"
          style={style}
          value={value}
          open={open}
          onDeselect={this.handleDeselect}
          placeholder={placeholder}
          getPopupContainer={() => document.getElementById('m-select')}
          dropdownRender={() => (
            <Menu onClick={this.menuClick} selectable={false}>
              <Menu.Item
                key="tip"
                disabled
                style={{ lineHeight: '30px', height: '30px' }}
              >
                选择资源属性进行过滤
              </Menu.Item>
              {Object.keys(items).map(value => (
                <Menu.Item
                  key={value}
                  style={{ lineHeight: '30px', height: '30px' }}
                >
                  {items[value]}
                </Menu.Item>
              ))}
            </Menu>
          )}
        />
      </div>
    );
  }
}

export default MultipleSelect;
