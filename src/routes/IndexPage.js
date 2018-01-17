import React from 'react';
import { connect } from 'dva';

import { Button, Input, Layout, List, Checkbox, DatePicker, Upload, message} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-tw';
moment.locale('zh-tw');
import styles from './IndexPage.css';


const { Content } = Layout;



class IndexPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.dispatch = props.dispatch;
    this.state = {
      item: '',
    };
  }   

  render() {
    const props = this.props;

    return (

      <Layout className={styles.layout}>
        <h1>待辦清單<small></small></h1>        
        <Content>
          <Input
            value={this.state.item}
            placeholder="請輸入待辦事項!"
            onChange={(e) => { this.setState({ item: e.target.value }); }}
          />
          <DatePicker onChange={this.handleChange} />
          <Button
            type="primary"
            icon="plus"
            disabled={this.state.item === ''}
            onClick={() => {
              props.dispatch({ type: 'example/add', item: { name: this.state.item, status: false } });
              this.setState({ item: '' });
            }}
          >新增</Button>
          <List
            className={styles.list}
            bordered
            dataSource={props.list}
            renderItem={(item, index) => (
              <List.Item>
                <Checkbox
                  className={(item.status ? styles.check : ' l')}
                  checked={item.status}
                  onChange={(e) => {
                    props.dispatch({ type: 'example/check', index, value: e.target.checked });
                  }}
                >{item.name}</Checkbox>
                <Button
                  className={styles.btnupd}
                  icon="edit"
                  onClick={() => {
                    props.dispatch({ type: 'example/check', index });
                  }}
                />
                <Button
                  className={styles.btndel}
                  type="danger" size="small" shape="circle" icon="cross"
                  onClick={() => {
                    props.dispatch({ type: 'example/delete', index });
                  }}
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout >
    );
  }

}

function mapStateToProps(state) {
  return {
    list: state.example.list,
  };
}

export default connect(mapStateToProps)(IndexPage);
