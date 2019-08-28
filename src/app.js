import React from 'react'
// import { hot } from 'react-hot-loader'
import MultipleSelect from './components/MultipleSelct';

const items = {
  name: '姓名',
  age: '年龄',
  addr: '地址'
}

class App extends React.Component {
  state = {
    curSelect: {}
  }
  handleSearch = value => {
    this.setState({
      curSelect: value
    });
  }
  render() {
    const { curSelect } = this.state;
    return (
      <div style={{padding: '20px'}}>
        <div style={{width: '500px', marginBottom: '20px'}}>
          <MultipleSelect
            style={{width: '100%'}}
            items={items}
            handleSearch={this.handleSearch}
          />
        </div>
        <div>
          <span>当前选中：</span>
          <span>{JSON.stringify(curSelect)}</span>
        </div>
      </div>
    )
  }
}

// export default hot(module)(App);
export default App;