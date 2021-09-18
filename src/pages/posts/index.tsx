import React, { FunctionComponent } from 'react';
import { Card, Button, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import Item from 'antd/lib/list/Item';

class PostsPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log('props----- componentDidMount-----', this.props);
    const { dispatch } = this.props;

    dispatch({
      type: 'postsModal/fetchPostsData',
      payload: {},
    });
  }

  onChange = (e) => {
    console.log('size checked', e.target.value);
    this.setState({
      size: e.target.value,
    });
  };

  render() {
    console.log('props----------', this.props);
    const { loading } = this.props;
    const { postsListData } = this.props.postsModal;
    return (
      <Spin tip="Loading data..." spinning={loading.effects['postsModal/fetchPostsData']}>
        <div className={styles.postsPage}>
          <div className={styles.titleContent}>
            <h2>诗词:</h2>
            <Button type="primary">Create</Button>
          </div>
          {postsListData.map((item, index) => {
            return (
              <Card
                className={styles.cardStyle}
                key={item.id}
                title={item.title}
                extra={<Button type="primary">Edit</Button>}
              >
                <div className={styles.cardContent}>{item.content}</div>
                <div className={styles.cardFooter}>-----{item.user.name}</div>
              </Card>
            );
          })}
        </div>
      </Spin>
    );
  }
}
export default connect((postsModel) => ({
  ...postsModel,
}))(PostsPage);
